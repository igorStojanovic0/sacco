import { useGetProfileData } from "@/api/auth"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import toast from "react-hot-toast"

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1]
  return new URLSearchParams(urlStr)
}

export default function VideoUIKit() {
  // const roomID = getUrlParams().get("roomID") || randomID(5)
  const roomID = '123'
  // const { user } = useClerk()
  const {currentUser} = useGetProfileData()
  const user = localStorage.getItem('user')

  let myMeeting = (element: HTMLDivElement) => {
    const initMeeting = async () => {
      try {
        // const res = await fetch(`/api/zegocloud?userID=${user}`)

        // // Check if the response is okay and parse as JSON
        // if (!res.ok) {
        //   throw new Error(`Server error: ${res.statusText}`)
        // }

        // const data = await res.json().catch(() => {
        //   throw new Error("Invalid JSON response")
        // })

        // const { token, appID } = data

        // Check if token and appID are present
        // if (!token || !appID) {
        //   throw new Error("Incomplete response: Missing token or appID")
        // }

        const username =
        currentUser?.surName

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          5,
          'token',
          roomID,
          currentUser?._id!,
          username
        )

        const zp = ZegoUIKitPrebuilt.create(kitToken)
        zp.joinRoom({
          container: element,
          sharedLinks: [
            {
              name: "Personal link",
              url:
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?roomID=" +
                roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // Modify this for different scenarios
          },
        })
      } catch (error: any) {
        toast.error("Failed to initialize meeting")
        console.error("Failed to initialize meeting:", error.message)
        // Optionally handle the error, e.g., display a message to the user
      }
    }
    initMeeting()
  }

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  )
}
