'use client';

import { UserSection } from '@/components/group/components/UserSection';
import * as Icons from '@/components/group/icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { Channel, data } from '../../data';

// This is a nested layout
export default function ServerLayout({ children }: { children: ReactNode }) {
  let [closedCategories, setClosedCategories] = useState<number[]>([]);
  let params = useParams();
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

  function toggleCategory(categoryId: number) {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((id) => id !== categoryId)
        : [...closedCategories, categoryId]
    );
  }

  return (
    <>
      {/* Sidebar */}
      <div className='hidden w-60 flex-col bg-gray-800 md:flex'>
        <button className='flex h-12 items-center px-4 font-title text-[15px] font-semibold text-white shadow-sm transition hover:bg-gray-550/[0.16]'>
          <div className='relative mr-1 h-4 w-4'>
            <Icons.Verified className='absolute h-4 w-4 text-gray-550' />
            <Icons.Check className='absolute h-4 w-4' />
          </div>
          {server.label}
          <Icons.Chevron className='ml-auto h-[18px] w-[18px] opacity-80' />
        </button>

        <div className='flex-1 space-y-[21px] overflow-hidden pt-3 font-medium text-gray-300'>
          {server.categories.map((category) => (
            <div key={category.id}>
              {category.label && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className='flex w-full items-center px-0.5 font-title text-xs uppercase tracking-wide hover:text-gray-100'
                >
                  <Icons.Arrow
                    className={`${
                      closedCategories.includes(category.id) ? '-rotate-90' : ''
                    } mr-0.5 h-3 w-3 transition duration-200`}
                  />
                  {category.label}
                </button>
              )}

              <div className='mt-[5px] space-y-0.5'>
                {category.channels
                  .filter((channel) => {
                    let categoryIsOpen = !closedCategories.includes(
                      category.id
                    );

                    return categoryIsOpen || channel.unread;
                  })
                  .map((channel) => (
                    <ChannelLink channel={channel} key={channel.id} />
                  ))}
              </div>
            </div>
          ))}
          
        </div>
        <UserSection />
      </div>

      {children}
    </>
  );
}

type IconName = keyof typeof Icons;

function ChannelLink({ channel }: { channel: Channel }) {
  let iconName: IconName = 'Hashtag';
  if (channel.icon) {
    iconName = channel.icon as IconName;
  }
  let Icon = Icons[iconName];

  let params = useParams();
  let server = data.find((server) => server.id.toString() === params.sid);
  let active = channel.id.toString() === params.cid;

  const state = active
    ? 'active'
    : channel.unread
    ? 'inactiveUnread'
    : 'inactiveRead';

  const classes = {
    active: 'text-white bg-gray-550/[0.32]',
    inactiveUnread:
      'text-white hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]',
    inactiveRead:
      'text-gray-300 hover:text-gray-100 hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]',
  };

  return (
    <Link
      href={`/Groups/servers/${server?.id}/channels/${channel.id}`}
      className={`${classes[state]} group relative mx-2 flex items-center rounded px-2 py-1`}
    >
      {state === 'inactiveUnread' && (
        <div className='absolute left-0 -ml-2 h-2 w-1 rounded-r-full bg-white'></div>
      )}
      <Icon className='mr-1.5 h-5 w-5 text-gray-400' />
      {channel.label}
      <Icons.AddPerson className='ml-auto h-4 w-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100' />
    </Link>
  );
}
