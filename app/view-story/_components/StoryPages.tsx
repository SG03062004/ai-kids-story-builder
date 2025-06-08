import React, { useRef } from 'react';
import { MdPlayCircleFilled } from "react-icons/md";

function StoryPages({ storyChapter }: any) {
  const isSpeakingRef = useRef(false); // prevent multiple plays

  const playSpeech = (text: string) => {
    const synth = window?.speechSynthesis;

    if (!synth) return;

    // Cancel previous speech if any
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    isSpeakingRef.current = true;

    // Callback when speech ends
    utterance.onend = () => {
      isSpeakingRef.current = false;
    };

    // Only speak if not already speaking
    if (!synth.speaking) {
      synth.speak(utterance);
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold text-[#cad3ff] flex justify-between'>
        {storyChapter?.chapter_title}
        <span
          className='text-3xl cursor-pointer'
          onClick={() => playSpeech(storyChapter?.story)}
        >
          <MdPlayCircleFilled />
        </span>
      </h2>
      <p className='text-xl p-10 mt-3 rounded-lg bg-slate-100 text-black'>
        {storyChapter?.story}
      </p>
    </div>
  );
}

export default StoryPages;
