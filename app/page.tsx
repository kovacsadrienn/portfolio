"use client";

import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconExternalLink,
} from "@tabler/icons-react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import InteractiveTiles from "@/components/InteractiveTiles/InteractiveTiles";

const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const carouselRef = useRef<any>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projects = [
    {
      name: "Hungarian card design",
      description:
        "A geometric redesign of the traditional Hungarian playing card deck, created as my Bachelor’s thesis project. The character illustrations on the cards are inspired by the classic ballads of the renowned Hungarian poet, János Arany.",

      images: [
        "/magyarkartya1.png",
        "/magyarkartya2.png",
        "/magyarkartya3.mp4",
      ],
      defaultsize: ["55%", "60%", "45%"],
    },
    {
      name: "Mycelia - video game",
      description:
        "A stylized, painterly video game project where the player explores an island filled with giant mushrooms. The gameplay centers around environmental exploration and solving a music-based puzzle to unlock a hidden treasure chest.",
      images: ["/mycelia1.png", "/mycelia2.png", "/mycelia3.mp4"],
      defaultsize: ["55%", "60%", "45%"],
    },
    {
      name: "Character social",
      description:
        "A creative social media styling exercise built around a fictional character named Dorin, a small elf. The project showcases visual storytelling through a series of illustrated and animated posts documenting his whimsical adventures.",
      images: [
        "/karaktersocial1.png",
        "/karaktersocial2.png",
        "/karaktersocial3.mp4",
      ],
      defaultsize: ["25%", "70%", "75%"],
    },
    {
      name: "IWTV series intro",
      description:
        "A digital stop-motion animation created as an alternative title sequence for the TV series Interview with the Vampire. The project combines dark, atmospheric aesthetics with traditional frame-by-frame digital techniques.",

      images: [
        "/sorozatintro1.png",
        "/sorozatintro2.png",
        "/sorozatintro3.mp4",
      ],
      defaultsize: ["55%", "60%", "45%"],
    },
  ];

  const socialLinks = [
    {
      icon: IconBrandGithub,
      href: "https://github.com/kovacsadrienn",
      label: "GitHub",
      color: "hover:text-neutral-300",
    },
    {
      icon: IconBrandLinkedin,
      href: "https://www.linkedin.com/in/adrienn-kov%C3%A1cs-52365b23b/",
      label: "LinkedIn",
      color: "hover:text-neutral-300",
    },

    {
      icon: IconMail,
      href: "mailto:kovacs.adrienn@gmail.com",
      label: "Email",
      color: "hover:text-neutral-300",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 relative">
      {/* Introduction Section */}
      <section className="min-h-screen flex items-center justify-center  py-20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <InteractiveTiles />
        </div>
        <div className="max-w-2xl w-full space-y-6 relative z-10 pointer-events-none">
          <h1 className="text-6xl md:text-7xl font-bold font-heading tracking-tight">
            Adrienn Kovács
          </h1>
          <h2 className="text-2xl tracking-tight  text-neutral-300">
            Graphic & Media Designer
          </h2>
          <div className="flex md:hidden gap-6 pt-2">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.href}
                  aria-label={link.label}
                  className={`text-neutral-400 transition-all duration-300 hover:scale-110 ${link.color}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed font-serif">
            Graphic & Media Design student with a background ranging from
            traditional art techniques to digital design. I approach graphic
            design with a systematic mindset and am currently expanding my
            creative and digital expertise through Media Design studies.
          </p>
          <div className="pt-4 pointer-events-auto">
            <Button
              size="lg"
              className="bg-neutral-50 text-neutral-950 hover:bg-neutral-200"
              onClick={() =>
                projectsSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              View My Work
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        className="min-h-screen flex items-center px-6 py-20 relative z-20 bg-neutral-950"
        ref={projectsSectionRef}
      >
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-12">
            Projects
          </h1>
          <div className="w-full flex items-center justify-center">
            {/* Mobile: Project Carousel */}
            {isMobile && (
              <div className="w-full">
                <Carousel
                  ref={carouselRef}
                  className="w-80%"
                  opts={{ align: "center" }}
                >
                  <CarouselContent>
                    {projects.map((project, idx) => (
                      <CarouselItem key={idx} className="basis-auto">
                        <button
                          onClick={() => setCurrentProject(idx)}
                          className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-all ${
                            currentProject === idx
                              ? "bg-neutral-50 text-neutral-950 font-semibold"
                              : "text-neutral-300 hover:text-neutral-50"
                          }`}
                        >
                          {project.name}
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {/* <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" /> */}
                </Carousel>

                {/* Content for mobile carousel */}
                {projects[currentProject] && (
                  <div key={currentProject} className="mt-8 space-y-12">
                    <div className="w-full space-y-4">
                      {projects[currentProject].images && (
                        <>
                          <div className="flex items-center justify-center overflow-hidden rounded-lg border bg-neutral-900">
                            <img
                              src={projects[currentProject].images[0]}
                              alt="Project image 1"
                              className="w-full h-auto"
                            />
                          </div>
                          <div className="flex items-center justify-center overflow-hidden rounded-lg border bg-neutral-900">
                            <img
                              src={projects[currentProject].images[1]}
                              alt="Project image 2"
                              className="w-full h-auto"
                            />
                          </div>
                          <div className="flex items-center justify-center overflow-hidden rounded-lg border bg-neutral-900">
                            <video
                              src={projects[currentProject].images[2]}
                              autoPlay
                              muted
                              loop
                              className="w-full h-auto"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Project Description */}
                    <div className="space-y-4 max-w-4xl">
                      <h3 className="text-2xl font-bold font-heading">
                        {projects[currentProject].name}
                      </h3>
                      <p className="text-neutral-300 leading-relaxed font-serif">
                        {projects[currentProject].description}
                      </p>
                      <Button
                        variant="outline"
                        className="border-neutral-700 text-neutral-50 hover:bg-neutral-900"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Desktop: Tabs */}
            {!isMobile && (
              <Tabs defaultValue="project-0" className="w-full">
                <TabsList
                  className="w-full overflow-x-auto flex justify-start md:justify-start gap-2"
                  variant="line"
                >
                  {projects.map((project, idx) => (
                    <TabsTrigger
                      key={idx}
                      value={`project-${idx}`}
                      className="text-xs md:text-sm whitespace-nowrap"
                    >
                      {project.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {projects.map((project, idx) => (
                  <TabsContent
                    key={idx}
                    value={`project-${idx}`}
                    className="mt-8 space-y-12"
                  >
                    {/* Desktop: Resizable Panels */}
                    <ResizablePanelGroup
                      orientation="horizontal"
                      className="w-full rounded-lg border"
                    >
                      <ResizablePanel
                        defaultSize={project?.defaultsize?.[1] ?? "50%"}
                      >
                        <div className="flex h-[600px] items-center justify-center overflow-hidden">
                          {project.images && (
                            <img src={project.images[0]} alt="" />
                          )}
                        </div>
                      </ResizablePanel>
                      <ResizableHandle withHandle className="" />
                      <ResizablePanel>
                        <ResizablePanelGroup orientation="vertical">
                          <ResizablePanel
                            defaultSize={project?.defaultsize?.[0] ?? "50%"}
                          >
                            <div className="flex h-full items-center justify-center overflow-hidden">
                              {project.images && (
                                <img src={project.images[1]} alt="" />
                              )}
                            </div>
                          </ResizablePanel>
                          <ResizableHandle withHandle className=" " />
                          <ResizablePanel
                            defaultSize={project?.defaultsize?.[2] ?? "50%"}
                          >
                            <div className="flex h-full items-center justify-center overflow-hidden">
                              {project.images && (
                                <video
                                  src={project.images[2]}
                                  autoPlay
                                  muted
                                  loop
                                />
                              )}
                            </div>
                          </ResizablePanel>
                        </ResizablePanelGroup>
                      </ResizablePanel>
                    </ResizablePanelGroup>

                    {/* Project Description */}
                    <div className="space-y-4 max-w-4xl">
                      <h3 className="text-2xl font-bold font-heading">
                        {project.name}
                      </h3>
                      <p className="text-neutral-300 leading-relaxed font-serif">
                        {project.description}
                      </p>
                      <Button
                        variant="outline"
                        className="border-neutral-700 text-neutral-50 hover:bg-neutral-900"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </div>
      </section>

      {/* Fixed Social Icons - Bottom Left */}
      <div className="hidden md:flex fixed bottom-8 left-8 flex-col gap-6 z-50">
        {socialLinks.map((link, idx) => {
          const Icon = link.icon;
          return (
            <a
              key={idx}
              href={link.href}
              aria-label={link.label}
              className={`text-neutral-400 transition-all duration-300 hover:scale-110 ${link.color}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={24} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
