"use client"
import { useGetProfileData } from "@/api/auth";
import { GroupTypes, JoinedGroupTypes } from '@/types';
import { Button } from '@mui/base/Button';
import { Modal as BaseModal } from '@mui/base/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { css, styled } from '@mui/system';
import clsx from 'clsx';
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from 'react';
import { useState } from "react";
import { z } from 'zod';
import CourseInfo from './CourseInfo';

const formSchema = z.object({
    user_id: z.string().optional(),
    group_id: z.string().optional(),
});

export type JoinGroupFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (joinData: JoinGroupFormData) => void;
    course: GroupTypes
    joinedGroupList?: JoinedGroupTypes[]
}


function CourseCard({ course, onSave, joinedGroupList }: Props) {
    const { currentUser } = useGetProfileData();

    const router = useRouter()
    const [openParent, setOpenParent] = useState(false);
    const handleParentOpen = () => {
        setOpenParent(true);
    };
    const handleParentClose = () => {
        setOpenParent(false);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = () => {
        var newData = {
            group_id: course?._id,
            user_id: currentUser?._id
        }
        console.log("currentUser", newData);

        handleClose()
        handleParentClose()
        onSave(newData)
    }



    const Backdrop = React.forwardRef<
        HTMLDivElement,
        { open?: boolean; className: string }
    >((props, ref) => {
        const { open, className, ...other } = props;
        return (
            <div
                className={clsx({ 'base-Backdrop-open': open }, className)}
                ref={ref}
                {...other}
            />
        );
    });

    const blue = {
        200: '#99CCFF',
        300: '#66B2FF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        700: '#0066CC',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

    const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
    };

    const ModalContent = styled('div')(
        ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
    );

    const TriggerButton = styled(Button)(
        ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
    );

    const ModalButton = styled(Button)(
        ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${blue[500]};
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: 1px solid ${blue[500]};
    box-shadow: 0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
            }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};
  
    &:hover {
      background-color: ${blue[600]};
    }
  
    &:active {
      background-color: ${blue[700]};
      box-shadow: none;
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
      &:hover {
        background-color: ${blue[500]};
      }
    }
  `,
    );
    return (
        <>
            <div onClick={handleParentOpen}>
                <Card
                    className="flex flex-col h-80 shadow-md shadow-gray-300 !rounded-2xl !text-gray-800 !bg-[#eae9f4] cursor-pointer border-2 border-gray-400"
                >
                    <div className="h-1/2 overflow-hidden">
                        <Image src={(course?.group_avatar === 'default' || !course?.group_avatar) ? '/servers/mirage.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${course?.group_avatar}`} alt={`${course?.name}`} width={500} height={250} />
                    </div>
                    <div className="h-1/2 bg-[#eae9f4] overflow-hidden">
                        <CardContent className="flex flex-col flex-auto">
                            <CourseInfo course={course} />
                        </CardContent>
                    </div>
                </Card>
            </div>
            <Modal
                open={openParent}
                onClose={handleParentClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                slots={{ backdrop: StyledBackdrop }}
            >
                <ModalContent sx={style}>
                    <h2 id="parent-modal-title" className="modal-title text-2xl text-green-700">
                        {course?.name}
                    </h2>
                    <p id="parent-modal-description" className="modal-description">
                        Please Join this group!
                    </p>
                    <React.Fragment>
                        <div className="flex justify-center space-x-3">
                            <ModalButton onClick={handleParentClose} className="w-52 bg-gray-500" >Cancel</ModalButton>
                            <ModalButton onClick={handleOpen} className="w-52">Join</ModalButton>
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                            slots={{ backdrop: StyledBackdrop }}
                        >
                            <ModalContent sx={[style, { width: '240px' }]}>
                                <h2 id="child-modal-title" className="modal-title">
                                    Are you sure you want to join?
                                </h2>
                                <p id="child-modal-description" className="modal-description">
                                    Please click button
                                </p>
                                <ModalButton onClick={onSubmit} className="">OK</ModalButton>
                            </ModalContent>
                        </Modal>
                    </React.Fragment>
                </ModalContent>
            </Modal>
        </>
    );




}

export default CourseCard;
