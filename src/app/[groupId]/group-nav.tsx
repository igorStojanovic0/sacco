'use client';

import { useGetProfileData } from '@/api/auth';
import GroupCreateDialog from '@/components/group/groupCreateDialog';
import { Eye, Verified } from '@/components/group/icons';
import { useMyContext } from '@/context/MyContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const GroupNav = () => {
  const { currentUser } = useGetProfileData()
  const { groupNotificationFlag, sendMsgGroupId, groupList } = useMyContext()

  return (
    <nav className='space-y-2 bg-[#6b75e4] p-3 overflow-y-auto overflow-x-hidden' style={{ scrollbarWidth: 'none' }}>

      <hr className='mx-2 rounded border-t-2 border-t-white/[0.06]' />

      {groupList?.map((group) => (
        <NavLink
          // href={`/Groups/servers/${group.group_id}/channels/${server.categories[0].channels[0].id}`}
          href={`/Groups/${group?.group_id}/welcome/1`}
          key={group.group_id}
        // active={params.sid === group.group_id.toString()}
        >
          {(sendMsgGroupId === group?.group_id) && groupNotificationFlag && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-[#d4d6f3]" />
          )}
          <img width={48} height={48} src={(group?.group_avatar === 'default' || !group?.group_avatar) ? '/servers/mirage.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${group.group_avatar}`} alt='group' />
        </NavLink>
      ))}

      <hr className='mx-2 rounded border-t-2 border-t-white/[0.06]' />

      <GeneralLink>
        <GroupCreateDialog currentUser={currentUser} />
      </GeneralLink>

      <NavLink href='/Groups/'>
        <Eye className='h-5 w-7' />
      </NavLink>
      <hr className='mx-2 rounded border-t-2 border-t-white/[0.06]' />
      <NavLink href='/Groups/'>
        <Verified className='h-5 w-7' />
      </NavLink>

    </nav>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
}) {
  let pathName = usePathname();
  active ||= pathName === href;

  return (
    <Link href={href} className='group relative block'>
      <div className='absolute -left-3 flex h-full items-center'>
        <div
          className={`${active
            ? 'h-10'
            : 'h-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
            }  w-1 origin-left  rounded-r bg-black transition-all duration-200 `}
        ></div>
      </div>

      <div className='group-active:translate-y-px'>
        <div
          className={`${active
            ? 'rounded-2xl bg-brand text-white'
            : 'rounded-3xl bg-white text-gray-100 group-hover:rounded-2xl group-hover:bg-brand group-hover:text-white'
            } flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}

function GeneralLink({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  let pathName = usePathname();

  return (
    <>
      <div className='absolute -left-3 flex h-full items-center'>
        <div
          className={`${active
            ? 'h-10'
            : 'h-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
            }  w-1 origin-left  rounded-r bg-white transition-all duration-200 `}
        ></div>
      </div>

      <div className='group-active:translate-y-px'>
        <div
          className={`${active
            ? 'rounded-2xl bg-brand text-white'
            : 'rounded-3xl bg-white text-gray-100 group-hover:rounded-2xl group-hover:bg-brand group-hover:text-white'
            } flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default GroupNav
