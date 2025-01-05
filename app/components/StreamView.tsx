"use client";

import { useState, useEffect, use, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Share2, Axis3DIcon } from "lucide-react";

import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Appbar } from "../components/Appbar";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { YT_REGEX } from "@/app/lib/util";
// @ts-ignore
import YouTubePlayer from "youtube-player";

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
}

export default function StreamView({
  creatorId,
  playVideo = false,
}: {
  creatorId: string;
  playVideo: boolean;
}) {
  const [inputLink, setInputLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [playNextLoader, setPlayNextLoader] = useState(false);
  const videoPlayerRef= useRef<HTMLDivElement>(null);

  async function refreshStreams() {
    const res = await fetch(`/api/streams/?creatorId=${creatorId}`, {
      credentials: "include",
    });
    const json = await res.json();
    setQueue(
      json.streams.sort((a: any, b: any) => (a.upvotes < b.upvotes ? 1 : -1))
    );
    setCurrentVideo(video => {
      if(video?.id === json.activeStream?.stream?.id){
        return video;
      }
      return json.activeStream;
    });
  }

  const REFRESH_INTERVAL = 10000000000;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      refreshStreams();
      const interval = setInterval(() => {
        refreshStreams();
      }, REFRESH_INTERVAL);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && videoPlayerRef.current) {
      let player = YouTubePlayer(videoPlayerRef.current);
      player.loadVideoById(currentVideo?.extractedId);
      player.playVideo();
      function eventHandler(event: any) {
        if (event.data === 0) {
          playNext();
        }
      }
      player.on('stateChange', eventHandler);
      return () => {
        player.destroy();
      }
    }
  }, [currentVideo, videoPlayerRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("api/streams/", {
      method: "POST",
      body: JSON.stringify({
        creatorId,
        url: inputLink,
      }),
    });

    if (res.ok) {
      const newVideo = await res.json();
      setQueue([...queue, newVideo]);
    } else {
      toast.error("Failed to add video to queue. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(false);
    setInputLink("");
  };

  const handleVote = (id: string, isUpvote: boolean) => {
    setQueue(
      queue
        .map((video) =>
          video.id === id
            ? {
                ...video,
                upvotes: isUpvote ? video.upvotes + 1 : video.upvotes - 1,
                haveUpvoted: !video.haveUpvoted,
              }
            : video
        )
        .sort((a, b) => b.upvotes - a.upvotes)
    );
    fetch(`/api/streams/${isUpvote ? "upvote" : "downvote"}`, {
      method: "POST",
      body: JSON.stringify({
        streamId: id,
      }),
    });
  };

  const playNext = async () => {
    if (queue.length > 0) {
      try {
        setPlayNextLoader(true);
        const data = await fetch("api/streams/next", {
          method: "GET",
        });
        const json = await data.json();
        setCurrentVideo(json.stream);
        setQueue(q => q.filter(x => x.id !== json.stream?.id));
      } catch (error) {

      }
      setPlayNextLoader(false);
    }
  };

  const handleShare = () => {
    const shareableLink = `${window.location.hostname}/creator/${creatorId}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        toast.success("Shareable link copied to clipboard!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err: Error) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy link. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 ">
      <Appbar />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-screen-xl pt-8 ">
        <div>
          <div className="container mx-auto p-4 flex-grow max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Song Voting Queue
            </h1>

            <div className="grid grid-cols-1 gap-6">
              {/* Input for new video */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter YouTube video link"
                    value={inputLink}
                    onChange={(e) => setInputLink(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                  />
                  <Button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? "Loading..." : "Add to Queue"}
                  </Button>

                  {inputLink && inputLink.match(YT_REGEX) && !loading && (
                    <Card className="bg-gray-800 border-gray-800">
                      <CardContent className="p-4">
                        <LiteYouTubeEmbed
                          title=""
                          id={inputLink.split("?v=")[1]}
                        />
                      </CardContent>
                    </Card>
                  )}

                  
                </div>

                {/* Now Playing section */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Now Playing</h2>
                  {currentVideo ? (
                    <div className="space-y-4">
                      {playVideo ? (
                        <>
                        <div ref={videoPlayerRef} className="w-full"/>
                          
                        </>
                      ) : (
                        <>
                          <img
                            src={currentVideo.bigImg}
                            className="w-full h-72 object-cover rounded"
                          />
                          <p className="text-lg font-medium text-gray-200">
                            {currentVideo.title}
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-800 h-[350px] flex items-center justify-center text-gray-400 rounded-lg">
                      No video currently playing
                    </div>
                  )}
                  <div className="flex space-x-2 mt-4">
                    {playVideo && (
                      <Button
                        onClick={playNext}
                        disabled={playNextLoader}
                        className="flex-grow bg-green-600 hover:bg-green-700 disabled:bg-gray-700"
                      >
                        {playNextLoader ? "Loading..." : "Play Next"}
                      </Button>
                    )}
                    <Button
                      onClick={handleShare}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Videos section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Upcoming Songs</h2>
          {queue.length === 0 && <Card className="bg-gray-900 border-gray-800 w-full">
            <CardContent className="p-4"><p className="text-center py-8 text-gray-400">No videos in queue</p></CardContent></Card>}
          <div className="space-y-2 max-h-[calc(300vh-400px)] overflow-y-auto">
            {queue.map((video) => (
              <Card key={video.id} className="bg-gray-800 border-gray-700">
                <CardContent className="flex items-center space-x-4 p-4">
                  <Image
                    src={video.smallImg}
                    alt={`Thumbnail for ${video.title}`}
                    width={120}
                    height={90}
                    className="rounded-md"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-gray-200">{video.title}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleVote(video.id, video.haveUpvoted ? false : true)
                        }
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        {video.haveUpvoted ? (
                          <ChevronDown className="h-4 w-4 " />
                        ) : (
                          <ChevronUp className="h-4 w-4 " />
                        )}
                        <span>{video.upvotes}</span>
                      </Button>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}
