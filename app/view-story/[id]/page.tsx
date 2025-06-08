'use client';
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from '../_components/BookCoverPage';
import StoryPages from '../_components/StoryPages';
import LastPage from '../_components/LastPage';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";

function ViewStory({ params }: any) {
  const [story, setStory] = useState<any>(null);
  const bookRef = useRef<any>(null);
  const [count,setCount]=useState(0);

  useEffect(() => {
    getStory();
  }, []);

  const getStory = async () => {
    const result = await db.select().from(StoryData)
      .where(eq(StoryData.storyId, params.id));
    setStory(result[0]);
  }

  if (!story) {
    return <div className="text-center text-xl py-20 text-[#4a5c99]">Loading story...</div>;
  }

  return (
    <div className="bg-[#cad3ff] p-10 md:px-20 lg:px-40 flex-col">
      <h2 className='font-bold text-4xl text-center p-10 bg-[#4a5c99] text-white'>
        {story.output?.title}
      </h2>
      <div className='relative'>
         {/* @ts-ignore */}
        <HTMLFlipBook
          width={500}
          height={500}
          showCover={true}
          className='mt-10'
          useMouseEvents={false}
          ref={bookRef}
        >
          <div>
            <BookCoverPage imageUrl={story.coverImage} />
          </div>
          {
            story?.output?.chapters?.map((chapter: any, index: number) => (
              <div key={index} className='bg-white p-10 border'>
                <StoryPages storyChapter={chapter} />
              </div>
            ))
          }
          <div>
            <LastPage />
          </div>
        </HTMLFlipBook>

        {count!=0 && <div className='absolute -left-5 top-[250px]'>
          <IoIosArrowDropleftCircle
            className='text-[40px] text-[#4a5c99] cursor-pointer'
            onClick={() => {bookRef.current?.pageFlip()?.flipPrev(); setCount(count-1)}}
          />
        </div>
        }
        {count!=(story?.output.chapters?.length-1) && <div className='absolute -right-5 top-[250px]'>
          <IoIosArrowDroprightCircle
            className='text-[40px] text-[#4a5c99] cursor-pointer'
            onClick={() => {bookRef.current?.pageFlip()?.flipNext(); setCount(count+1)}}
          />
        </div>}
      </div>
    </div>
  );
}

export default ViewStory;
