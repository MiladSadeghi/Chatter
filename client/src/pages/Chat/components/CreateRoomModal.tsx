import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { useCreateRoomMutation } from "src/core/features/room/roomApiSlice";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toggleCreateRoomModal } from "src/core/features/user/userSlice";
import { motion } from "framer-motion";
import route from "src/animation/route";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

const CreateRoomModal = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [createRoom, { isSuccess, isError, isLoading }] =
    useCreateRoomMutation();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomName === "") {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [roomName]);

  const handleCreateRoom = async () => {
    try {
      await createRoom(roomName);
      toast.success("Room created.");
      dispatch(toggleCreateRoomModal());
    } catch (error) {
      toast.success("try again later!.");
    }
  };

  return (
    <Main>
      <Wrapper variants={route} initial="initial" animate="shown" exit="exit">
        <Modal>
          <ModalHeader>
            <h5 className="font-DMSans">Create New Room</h5>
            <XMarkIcon
              className="cursor-pointer text-my-light-purple"
              width={22}
              onClick={() => dispatch(toggleCreateRoomModal())}
            />
          </ModalHeader>
          <ModalBody>
            <h5 className="font-Inter text-sm">room name</h5>
            <ModalInput
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <ModalButton disabled={canSubmit} onClick={handleCreateRoom}>
              {isLoading ? (
                <>
                  <Oval
                    height={20}
                    width={20}
                    color="#e1e1fc"
                    wrapperClass="mr-1"
                    secondaryColor="#8a8cf4"
                    strokeWidth={6}
                    strokeWidthSecondary={6}
                  />
                  Please Wait...
                </>
              ) : (
                "Create"
              )}
            </ModalButton>
          </ModalBody>
        </Modal>
      </Wrapper>
    </Main>
  );
};

const Main = tw.div`absolute h-full w-full bg-gray-600/[0.8]`;
const Wrapper = tw(motion.div)`container mx-auto`;
const Modal = tw.div`w-[420px] max-w-full mx-auto mt-8 `;
const ModalHeader = tw.div`py-2 px-4 bg-white rounded-t-lg border-b border-gray-300 flex justify-between items-center`;
const ModalBody = tw.div`flex flex-col py-2 px-4 bg-white rounded-b-lg`;
const ModalInput = tw.input`border border-solid rounded border-gray-300 mt-2 px-2`;
const ModalButton = tw.button`mt-2 w-full py-1 bg-my-light-purple text-white font-Inter rounded-lg cursor-pointer disabled:opacity-50 flex justify-center items-center font-light`;

export default CreateRoomModal;
