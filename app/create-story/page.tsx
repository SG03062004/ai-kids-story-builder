"use client";
import React, { useContext, useState } from "react";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@heroui/button";
import { chatSession } from "@/config/GeminiAi";
//@ts-ignore
import uuid4 from "uuid4";
import { db } from "@/config/db";
import { StoryData, Users } from "@/config/schema";
import CustomLoader from "./_components/CustomLoader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";
import { GenerateImage } from "@/lib/generateImage";

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;
export interface fieldData {
  fieldName: string;
  fieldValue: string;
}
export interface formDataType {
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

function CreateStory() {
  const [formData, setFormData] = useState<formDataType>({
    storySubject: "",
    storyType: "",
    imageStyle: "",
    ageGroup: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Initialize router
  const notify=(msg:string)=>toast(msg);
  const notifyError=(msg:string)=>toast.error(msg);
  const {user}=useUser();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);

  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
    console.log("Form Data:", formData);
  };

  const GenerateStory = async () => {
    if(userDetail.credit<=0){
      notifyError('You dont have enough credits');
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = CREATE_STORY_PROMPT?.replace(
      "{ageGroup}",
      formData?.ageGroup ?? ""
    )
      .replace("{storyType}", formData?.storyType ?? "")
      .replace("{storySubject}", formData?.storySubject ?? "")
      .replace("{imageStyle}", formData?.imageStyle ?? "");
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const storyText = await result?.response.text();
      const imagePrompt = `${formData.imageStyle} illustration of ${formData.storySubject} in a ${formData.storyType} for ${formData.ageGroup}`;
      const base64Image = await GenerateImage(imagePrompt);
      const resp = await SaveInDB(storyText, base64Image);
      const storyId = resp?.[0]?.storyId; // Assuming 'returning' gives an array
      setLoading(false);
      if (storyId) {
        router.push(`/view-story/${storyId}`);
      }
      notify('Story Generated');
      await UpdateUserCredits();
    } catch (e) {
      console.error(e);
      notifyError('Server Error, Try Again');
      setLoading(false);
    }

  };

  const SaveInDB = async (output: string, coverImage: string) => {
    const recordId = uuid4();
    setLoading(true);
    try {
      const result = await db
        .insert(StoryData)
        .values({
          storyId: recordId,
          ageGroup: formData?.ageGroup,
          imageStyle: formData?.imageStyle,
          storySubject: formData?.storySubject,
          storyType: formData?.storyType,
          output: JSON.parse(output),
          coverImage: coverImage,
          userEmail: user?.primaryEmailAddress?.emailAddress ?? null
        })
        .returning({ storyId: StoryData?.storyId });
      setLoading(false);
      return result; // ✅ Expecting [{ storyId: '...' }]
    } catch (e) {
      setLoading(false);
      console.error("Error saving to DB:", e);
      return null;
    }
  };

  const UpdateUserCredits=async()=>{
    const result=await db.update(Users).set({
      credit:Number(userDetail?.credit-1)
    }).where(eq(Users.userEmail,user?.primaryEmailAddress?.emailAddress??''))
    .returning({id:Users.id})
  }

  return (
    <div className="bg-[#cad3ff] p-10 md:px-20 lg:px-40">
      <h2 className="font-extrabold text-[70px] text-center text-[#5253A3]">
        CREATE YOUR STORY
      </h2>
      <p className="text-2xl text-[#5253A3] text-center">
        Unlock your creativity with AI: Craft stories like never before! Let our
        AI bring your imagination to life, one story at a time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
        <StorySubjectInput userSelection={onHandleUserSelection} />
        <StoryType userSelection={onHandleUserSelection} />
        <AgeGroup userSelection={onHandleUserSelection} />
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>
      <div className="flex justify-end my-10 flex-col items-end">
        <Button
          disabled={loading}
          className="p-10 text-2xl bg-gradient-to-tr from-purple-800 to-pink-600 text-white shadow-lg rounded-2xl"
          onClick={GenerateStory}
        >
          <span>1 Credit will be used</span>
          {loading ? "Generating..." : "Generate Story"}
        </Button>
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  );
}

export default CreateStory;
