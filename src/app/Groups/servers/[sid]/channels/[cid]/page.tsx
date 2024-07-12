import * as Icons from '@/components/group/icons';
import Image from 'next/image';
import { Message, data } from '../../../../data';

export default function ChannelPage({
  params,
}: {
  params: { sid: string; cid: string };
}) {
  let server = data.find((server) => server.id.toString() === params.sid);

  if (!server) {
    return null;
  }

  const channel = server.categories
    .map((c) => c.channels)
    .flat()
    .find((channel) => channel.id.toString() === params.cid);

  if (!channel) {
    return null;
  }

  return (
    <div className='flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700'>
      <div className='flex h-12 items-center px-2 shadow-sm'>
        <div className='flex items-center'>
          <Icons.Hashtag className='mx-2 h-6 w-6 font-semibold text-gray-400' />
          <span className='mr-2 whitespace-nowrap font-title text-white'>
            {channel.label}
          </span>
        </div>

        {channel.description && (
          <>
            <div className='mx-2 hidden h-6 w-px bg-white/[.06] md:block'></div>
            <div className='mx-2 hidden truncate text-sm font-medium text-gray-200 md:block'>
              {channel.description}
            </div>
          </>
        )}

        {/* Mobile buttons */}
        <div className='ml-auto flex items-center md:hidden'>
          <button className='text-gray-200 hover:text-gray-100'>
            <Icons.HashtagWithSpeechBubble className='mx-2 h-6 w-6' />
          </button>
          <button className='text-gray-200 hover:text-gray-100'>
            <Icons.People className='mx-2 h-6 w-6' />
          </button>
        </div>

        {/* Desktop buttons */}
        <div className='ml-auto hidden items-center md:flex'>
          <button className='text-gray-200 hover:text-gray-100'>
            <Icons.HashtagWithSpeechBubble className='mx-2 h-6 w-6' />
          </button>
          <button className='text-gray-200 hover:text-gray-100'>
            <Icons.Bell className='mx-2 h-6 w-6' />
          </button>
          <button className='text-gray-200 hover:text-gray-100'>
            <Icons.Pin className='mx-2 h-6 w-6' />
          </button>
          <button className='text-gray-200 hover:text-gray-100'>
            <Icons.People className='mx-2 h-6 w-6' />
          </button>
          <div className='relative mx-2'>
            <input
              type='text'
              placeholder='Search'
              className='h-6 w-36 rounded border-none bg-gray-900 px-1.5 text-sm font-medium placeholder-gray-400'
            />
            <div className='absolute inset-y-0 right-0 flex items-center'>
              <Icons.Spyglass className='mr-1.5 h-4 w-4 text-gray-400' />
            </div>
          </div>
          <button className='text-gray-200 hover:text-gray-100'>
            <Icons.Inbox className='mx-2 h-6 w-6' />
          </button>
          <button className='text-gray-200 hover:text-gray-100'>
            <Icons.QuestionCircle className='mx-2 h-6 w-6' />
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-y-scroll'>
        {channel.messages.map((message, i) => (
          <div key={message.id}>
            {i === 0 || message.user !== channel.messages[i - 1].user ? (
              <MessageWithUser message={message} />
            ) : (
              <Message message={message} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MessageWithUser({ message }: { message: Message }) {
  return (
    <div className='mt-[17px] flex py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]'>
      <Image
        className='mr-4 mt-0.5 h-10 w-10 rounded-full'
        src={message.avatarUrl}
        width={40}
        height={40}
        alt=''
      />
      <div>
        <p className='flex items-baseline'>
          <span className='mr-2 text-[15px] font-medium text-white'>
            {message.user}
          </span>
          <span className='text-xs font-semibold text-gray-400'>
            {message.date}
          </span>
        </p>
        <p className='text-gray-100'>{message.text}</p>
      </div>
    </div>
  );
}

function Message({ message }: { message: Message }) {
  return (
    <div className='py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]'>
      <p className='pl-14 text-gray-100'>{message.text}</p>
    </div>
  );
}
