"use client";

// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ChevronDown, ChevronUp, Share2, Axis3DIcon } from "lucide-react";

// import Image from "next/image";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import YouTubeEmbed from "@/next/third-parties/google";
// import axios from "axios";
// import { Appbar } from "../components/Appbar";
// import { url } from "inspector";
// import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
// import { YT_REGEX } from "@/app/lib/util";
// import { METHODS } from "http";
// import { set } from "zod";
import StreamView from "../components/StreamView";

interface Video {
  id: string;
  title: string;
  url: string;
  extractedId: string;
  type: string;
  smallImg: string;
  bigImg: string;
  active: boolean;
  userId: string;
  upvotes: number;
  haveUpvoted: boolean;
  // thumbnailUrl: string
}

const creatorId = "e51b2829-aa03-4269-891b-df16fc25dec6";

export default function Component() {
  return <StreamView creatorId={creatorId} playVideo={true}/>
  
}
