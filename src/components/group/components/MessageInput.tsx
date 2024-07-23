import MediaDropdown from "@/components/group/components/media-dropdown"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useMyContext } from "@/context/MyContext"
import EmojiPicker, { Theme } from "emoji-picker-react"
import { Laugh, Mic, Send, Video } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { trimMessage } from "../lib/strings"

const MessageInput = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const params = useParams()
    const { msgEmit, msgInputState } = useMyContext()
    const [msgText, setMsgText] = useState("")

    let [isComponentVisible, setIsComponentVisible] = useState<boolean>(false)

    useEffect(() => {
        setUserId(localStorage.getItem('user'))
    },[])

    const handleSendTextMsg = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (params?.wId) {
                var Data = {
                    userId: userId,
                    groupId: params?.groupId,
                    roomId: `${params?.groupId}${params?.wId}`,
                    content: trimMessage(msgText),
                }

                if (msgText?.length > 0) {
                    await msgEmit("C2S_GROUP_CHAT_ROOM_MESSAGE_NEW", Data)
                } else {
                    alert('nothing input')
                }
            } else if (params?.fId) {
                var Data = {
                    userId: userId,
                    groupId: params?.groupId,
                    roomId: `${params?.fId}`,
                    content: trimMessage(msgText),
                }

                if (msgText?.length > 0) {
                    await msgEmit("C2S_GROUP_FRIEND_CHAT_ROOM_MESSAGE_NEW", Data)
                } else {
                    alert('nothing input')
                }
            } else if (params?.cId) {
                var Data = {
                    userId: userId,
                    groupId: params?.groupId,
                    roomId: `${params?.groupId}${params?.cId}`,
                    content: trimMessage(msgText),
                }

                if (msgText?.length > 0) {
                    await msgEmit("C2S_GROUP_CHAT_ROOM_MESSAGE_NEW", Data)
                } else {
                    alert('nothing input')
                }
            }
            setMsgText("")

        } catch (error: any) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className="bg-[#bfc3f0] p-2 flex gap-4 items-center m-2 rounded-xl">
            <div className="relative flex gap-2 ml-2">
                {/* EMOJI PICKER WILL GO HERE */}
                <div
                    // ref={ref} 
                    onClick={() => setIsComponentVisible(!isComponentVisible)}
                >
                    {isComponentVisible && (
                        <EmojiPicker
                            theme={Theme.DARK}
                            onEmojiClick={(emojiObject) => {
                                setMsgText((prev) => prev + emojiObject.emoji)
                            }}
                            style={{
                                position: "absolute",
                                bottom: "1.5rem",
                                left: "1rem",
                                zIndex: 50,
                            }}

                        />
                    )}
                    <Laugh className="text-[#374365] dark:text-gray-400" />
                </div>
                <MediaDropdown />
            </div>
            <form onSubmit={handleSendTextMsg} className="w-full flex gap-3">
                <div className="flex-1">
                    <Textarea
                        // type="text"
                        rows={1}
                        placeholder="Type a message"
                        className="py-2 text-sm w-full min-h-10 resize-y rounded-lg bg-gray-tertiary placeholder:text-gray-400 border-[#bfc3f0]"
                        value={msgText}
                        onChange={(e) => setMsgText(e.target.value)}
                        disabled={!msgInputState}
                    />
                </div>
                <div className="mr-4 flex items-center gap-2">
                    {msgText.length > 0 ? (
                        <Button
                            type="submit"
                            size={"sm"}
                            className="bg-transparent text-foreground hover:bg-transparent"
                        >
                            <Send />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            size={"sm"}
                            className="bg-transparent text-foreground hover:bg-transparent"
                        >
                            <Mic />
                        </Button>
                    )}
                    <Link
                        href='/video-call'
                        target="_blank"
                        className="bg-transparent text-foreground hover:bg-transparent"
                    >
                        <Video />
                    </Link>
                </div>
            </form>
        </div>
    )
}
export default MessageInput
