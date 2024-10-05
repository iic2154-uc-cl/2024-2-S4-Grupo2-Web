import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ImageIndicator from './ImageIndicator';

export default function PostInfo(props) {
  const { post } = props;
  return (
    <div
      id="postDetail_container"
      className="mx-10 mt-2 flex h-full flex-row gap-10"
    >
      <div
        id="image_&_contact_container"
        className="ml-20 mt-5 flex h-auto w-80 flex-col items-center gap-6"
      >
        <div
          id="image_container"
          className="relative flex h-auto w-80 items-center justify-center bg-gray-200"
        >
          <ImageIndicator
            totalImages={post.images.length}
            useState={useState}
            post={post}
          />
        </div>
        <div
          id="contact_container"
          className="flex h-fit w-full flex-col rounded-2xl border border-blue-500 bg-gray-200 p-3"
        >
          <div id="title" className="">
            <h1 className="text-center text-base font-medium leading-10">
              Información de contacto
            </h1>
          </div>
          <div id="name_owner" className="flex w-fit flex-row items-center">
            <PersonIcon className="mr-3" />
            <p className="w-fit text-sm font-medium leading-10">{post.contact_name}</p>
          </div>
          <div id="address" className="flex w-fit flex-row items-center">
            <LocationOnIcon className="mr-3" />
            <p className="w-fit text-sm font-medium leading-10">{post.address}</p>
          </div>
          <div id="call_phone" className="flex w-fit flex-row items-center">
            <CallIcon className="mr-3" />
            <p className="w-fit text-sm font-medium leading-10">{post.phone_number}</p>
          </div>
          <div id="wsp_phone" className="flex w-fit flex-row items-center">
            <WhatsAppIcon className="mr-3" />
            <p className="w-fit text-sm font-medium leading-10">{post.phone_number}</p>
          </div>
          <div id="email" className="flex w-fit flex-row items-center">
            <MailOutlineIcon className="mr-3" />
            <p className="w-fit text-sm font-medium leading-10">{post.email}</p>
          </div>
        </div>
      </div>
      <div
        id="postDetail_&_report_container"
        className="mb-10 ml-8 mr-20 flex flex-col items-center justify-center"
      >
        <div id="postDetail" className="flex flex-col">
          <div id="post_name" className="mt-2">
            <h1 className="text-base font-medium leading-10">{post.name}</h1>
          </div>
          <div id="post_description" className="mb-5">
            <p className="text-xs font-light">{post.description}</p>
          </div>
          <div id="post_details" className="flex flex-row justify-center gap-20">
            {post.type === 'PROPERTY' && (
              <div id="beds_&_rooms" className="flex flex-col">
                <div id="rooms" className="flex flex-row items-center">
                  <MeetingRoomIcon className="mr-3" />
                  <p id="rooms" className="text-sm font-medium leading-10">
                    Dormitorios: {post.rooms}
                  </p>
                </div>
                <div id="beds" className="flex flex-row items-center">
                  <BedroomChildIcon className="mr-3" />
                  <p id="simple_beds" className="text-sm font-medium leading-10">
                    Camas simples: {post.simple_beds}
                  </p>
                </div>
                <div id="beds" className="flex flex-row items-center">
                  <BedroomParentIcon className="mr-3" />
                  <p id="double_beds" className="text-sm font-medium leading-10">
                    Camas dobles: {post.double_beds}
                  </p>
                </div>
              </div>
            )}
            {post.type !== 'SERVICE' && (
              <div id="price" className="items-start justify-start">
                <div id="price_title" className="flex flex-row items-center">
                  <MonetizationOnIcon className="mr-1" />
                  <p id="price" className="text-sm font-medium leading-10">
                    Precio: ${post.price} CLP/día
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
