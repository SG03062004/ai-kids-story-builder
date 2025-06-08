import React from "react";
import { Card, CardFooter } from "@heroui/card";
import Image from "next/image";
import { Button } from "@heroui/button";
import Link from "next/link";

type StoryItemType = {
  story: {
    id: number;
    storyType: string;
    ageGroup: string;
    coverImage: string;
    imageStyle: string;
    userEmail: string;
    userImage: string;
    userName: string;
    output: any;
    storyId: string;
    storySubject: string;
  };
};

function StoryItemCard({ story }: StoryItemType) {
  return (
    <Link href={`/view-story/${story.storyId}`}>
      <Card
        isFooterBlurred
        className="w-full h-[300px] sm:w-[250px] lg:w-[280px] hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-xl overflow-hidden relative group"
      >
        <Image
          alt="Story Cover"
          className="z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={story.coverImage}
          width={500}
          height={300}
        />

        <CardFooter className="absolute bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 flex justify-between items-center z-10 w-full">
          <div>
            <p className="text-md font-semibold line-clamp-1">
              {story?.output?.title || story.storySubject || "Untitled Story"}
            </p>

            <p className="text-xs opacity-80 mt-1">
              {story.ageGroup} | {story.storyType}
            </p>
          </div>
          <Button
            className="text-xs bg-[#4a5c99] text-white hover:bg-[#3b4d85]"
            radius="full"
            size="sm"
          >
            Read Now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default StoryItemCard;
