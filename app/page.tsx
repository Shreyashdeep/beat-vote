'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Play, Users } from "lucide-react"
import Link from "next/link"
import { Appbar } from './components/Appbar'
import { Redirect } from './components/Redirect'

export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br bg-gray-900 text-gray-100">
      <Appbar/>
      <Redirect/>
      <header className="px-4 lg:px-6 h-14 flex items-center bg-gray-800/90 backdrop-blur-sm">
      
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-300">
                  Let Your Fans Choose the Beat
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  BeatVote puts the power in your fans&apos; hands. Create, connect, and let your audience shape your sound.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
                <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-900/50">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-purple-300">
              Why Choose BeatVote?
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-700">
                <Play className="h-8 w-8 mb-2 text-pink-400" />
                <h3 className="text-xl font-bold text-purple-300">Fan-Driven Playlists</h3>
                <p className="text-sm text-gray-300 text-center">
                  Let your audience vote on and curate your music in real-time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-700">
                <Users className="h-8 w-8 mb-2 text-pink-400" />
                <h3 className="text-xl font-bold text-purple-300">Live Streaming</h3>
                <p className="text-sm text-gray-300 text-center">
                  Stream with realtime votes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-700">
                <Music className="h-8 w-8 mb-2 text-pink-400" />
                <h3 className="text-xl font-bold text-purple-300">Instant Feedback</h3>
                <p className="text-sm text-gray-300 text-center">
                  Get real-time insights into your fans&apos; preferences and tastes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-purple-300">
                  Ready to Transform Your Music Experience?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Join BeatVote today and start creating unforgettable, interactive music experiences.
                </p>
              </div>
              {/* <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input 
                    className="max-w-lg flex-1 bg-gray-800 border-gray-700 focus:border-purple-500 text-white placeholder-gray-400"
                    placeholder="Enter your email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white">Sign Up</Button>
                </form>
              </div> */}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700 bg-gray-800">
        <p className="text-xs text-gray-400">© 2023 BeatVote. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-purple-400 hover:text-purple-300" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-purple-400 hover:text-purple-300" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}