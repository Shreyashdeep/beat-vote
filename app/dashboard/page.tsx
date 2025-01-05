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
import { User } from 'lucide-react';

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



const creatorId = "4b618f60-499b-4097-b7be-640406562322";
// const creatorId = User.id;

// export default function Component() {
//   return <StreamView creatorId={creatorId} playVideo={true}/>
  
// }




import { useEffect, useState } from 'react'
// import StreamView from '../components/StreamView'

export default function Component() {
    const [creatorId, setCreatorId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch("/api/user");
                const data = await response.json();
                setCreatorId(data.user?.id || null);
            } catch (e) {
                console.error("Error fetching user data:", e);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <StreamView creatorId={creatorId || ""} playVideo={true} />;
}