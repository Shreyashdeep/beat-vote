// import { prismaClient } from "@/app/lib/db";
// import { NextRequest, NextResponse } from "next/server";
// import { number, z } from "zod";
// // @ts-ignore
// import youtubesearchapi from "youtube-search-api";
// import { YT_REGEX } from "@/app/lib/util";
// import { getServerSession } from "next-auth";

// const CreateStreamSchema = z.object({
//   creatorId: z.string(),
//   url: z.string(),
// });
// export async function POST(req: NextRequest) {
//   try {
//     const data = CreateStreamSchema.parse(await req.json());
//     const isYt = data.url.match(YT_REGEX);
//     if (!isYt) {
//       return NextResponse.json(
//         {
//           message: "Wrong url formal",
//         },
//         {
//           status: 411,
//         }
//       );
//     }
//     const session = await getServerSession();
//     const user = await prismaClient.user.findFirst({
//       where: {
//         email: session?.user?.email ?? "",
//       },
//     });
//     if (!user) {
//       return NextResponse.json(
//         {
//           message: "Unauthenticated",
//         },
//         {
//           status: 403,
//         }
//       );
//     }
//     const extractedId = data.url.split("?v=")[1];
//     const res = await youtubesearchapi.GetVideoDetails(extractedId);
//     console.log(res.title);
//     console.log(res.thumbnail.thumbnails);
//     const thumbnails = res.thumbnail.thumbnails;
//     thumbnails.sort((a: { width: number }, b: { width: number }) =>
//       a.width < b.width ? -1 : 1
//     );

//     const stream = await prismaClient.stream.create({
//       data: {
//         userId: data.creatorId,
//         url: data.url,
//         type: "Youtube",
//         extractedId,
//         title: res.title ?? "Cant find video",
//         smallImg:
//           (thumbnails.length > 1
//             ? thumbnails[thumbnails.length - 2].url
//             : thumbnails[thumbnails.length - 1].url) ??
//           "https://i.pinimg.com/originals/20/83/3d/20833d3b448c8c0676e6d29d13fc07cc.gif",
//         bigImg:
//           thumbnails[thumbnails.length - 1].url ??
//           "https://i.pinimg.com/originals/20/83/3d/20833d3b448c8c0676e6d29d13fc07cc.gif",
//       },
//     });
//     return NextResponse.json({
//       ...stream,
//       hasUpvoted: false,
//       upvotes: 0,
//     });
//   } catch (e) {
//     console.log(e);
//     return NextResponse.json(
//       {
//         message: "error while adding a stream",
//       },
//       {
//         status: 411,
//       }
//     );
//   }
// }

// export async function GET(req: NextRequest) {
//   const creatorId = req.nextUrl.searchParams.get("creatorId");
//   const session = await getServerSession();
//   const user = await prismaClient.user.findFirst({
//     where: {
//       email: session?.user?.email ?? "",
//     },
//   });
//   if (!user) {
//     return NextResponse.json(
//       {
//         message: "Unauthenticated",
//       },
//       {
//         status: 403,
//       }
//     );
//   }
//   if (!creatorId) {
//     return NextResponse.json(
//       {
//         message: "Error",
//       },
//       {
//         status: 411,
//       }
//     );
//   }
//   const [streams, activStream] = await Promise.all([
//     await prismaClient.stream.findMany({
//       where: {
//         userId: creatorId,
//         played: false,
//       },
//       include: {
//         _count: {
//           select: {
//             upvotes: true,
//           },
//         },
//         upvotes: {
//           where: {
//             userId: user.id,
//           },
//         },
//       },
//     }),
//     prismaClient.currentStream.findFirst({
//       where: {
//         userId: creatorId,
//       },
//       include: {
//         stream: true,
//       },
//     }),
//   ]);
//   return NextResponse.json({
//     streams: streams.map(({ _count, ...rest }) => ({
//       ...rest,
//       upvotes: _count.upvotes,
//       haveUpvoted: rest.upvotes.length ? true : false,
//     })),
//     activStream,
//   });
// }

import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
import { YT_REGEX } from "@/app/lib/util";
import { getServerSession } from "next-auth";
import cors from "cors";
import express from "express";
const app = express();

// Enable CORS globally

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

const MAX_QUEUE_LEN = 20;

export async function POST(req: NextRequest) {
  app.use(
    cors({
      origin: "*", // Allow all origins
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
  );
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = data.url.match(YT_REGEX);
    if (!isYt) {
      return NextResponse.json(
        {
          message: "Wrong URL format",
        },
        {
          status: 411,
        }
      );
    }

    const extractedId = data.url.split("?v=")[1];

    const res = await youtubesearchapi.GetVideoDetails(extractedId);

    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );

    const existingActiveStream = await prismaClient.stream.count({
      where: {
        userId: data.creatorId,
      },
    });

    if (existingActiveStream > MAX_QUEUE_LEN) {
      return NextResponse.json(
        {
          message: "Already at limit",
        },
        {
          status: 411,
        }
      );
    }

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: res.title ?? "Cant find video",
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
        bigImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
      },
    });

    return NextResponse.json({
      ...stream,
      hasUpvoted: false,
      upvotes: 0,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Error while adding a stream",
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const session = await getServerSession();
  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthenticated",
      },
      {
        status: 403,
      }
    );
  }

  if (!creatorId) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 411,
      }
    );
  }

  const [streams, activeStream] = await Promise.all([
    await prismaClient.stream.findMany({
      where: {
        userId: creatorId,
        played: false,
      },
      include: {
        _count: {
          select: {
            upvotes: true,
          },
        },
        upvotes: {
          where: {
            userId: user.id,
          },
        },
      },
    }),
    prismaClient.currentStream.findFirst({
      where: {
        userId: creatorId,
      },
      include: {
        stream: true,
      },
    }),
  ]);

  return NextResponse.json({
    streams: streams.map(({ _count, ...rest }) => ({
      ...rest,
      upvotes: _count.upvotes,
      haveUpvoted: rest.upvotes.length ? true : false,
    })),
    activeStream,
  });
}
