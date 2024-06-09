import { CheckCheck } from 'lucide-react';
import Clipboard from '@/lib/Clipboard';
import Image from 'next/image';
import Integrations from '@/components/about/integrations';
import Link from 'next/link';

export const metadata = {
    metadataBase: new URL('https://autofloww.com'),
    alternates: {
        canonical: '/about',
        languages: {
            'en-US': '/en-US',
        },
    },
    title: 'Autofloww — About',
    description: 'Learn more about Autofloww and the rationale behind its creation.',
    robots: {
        index: true,
        follow: true,
        nocache: true,
    },
};

export default function About() {
    return (
        <>
            <div className="mt-32 flex-col flex lg:grid lg:grid-cols-12 px-8">
                <div className="md:text-7xl text-6xl col-span-4 font-bold">
                    <h1 className="mb-8 md:px-4 lg:px-8 text-primary">
                        About <span className="text-light-gray">Autofloww</span>
                    </h1>
                </div>
                <div className="font-mono col-start-6 col-span-5 max-w-xl lg:max-w-none text-lg md:text-xl  leading-[130%] text-light-gray font-medium space-y-7">
                    <p className="space-y-8 flex flex-col">
                        <span>
                            <strong>Autofloww</strong> is a platform that helps you automate your workflows and increase your productivity. Effortlessly connect your favorite tools like <span>Google Drive</span>, <span>Discord</span>, <span>Notion</span>, <span>Slack</span>, and <span>Google Calendar</span> to streamline your workflows and save time. You don&apos;t need to do stuffs manually, just let Autofloww do it for you.
                        </span>
                        <ul className="list-disc list-inside">
                            {/* use check mark here like tick mark and use emeojis for the icons */}
                            {/* use emojis */}
                            {/* ⚡ Automate repetitive tasks */}

                            <div className='flex gap-2'>
                                <CheckCheck className="w-6 h-6 text-primary" /> <li>Automate repetitive tasks</li></div>
                            <div className='flex gap-2'>
                                <CheckCheck className="w-6 h-6 text-primary" /> <li>Integrate with your favorite tools</li> </div>
                            <div className='flex gap-2'>
                                <CheckCheck className="w-6 h-6 text-primary" /> <li>Build custom workflows</li> </div>
                            <div className='flex gap-2'>
                                <CheckCheck className="w-6 h-6 text-primary" /> <li>Streamline your workflows</li> </div>
                            <div className='flex gap-2'>
                                <CheckCheck className="w-6 h-6 text-primary" /> <li>Save time and reduce errors</li> </div>



                        </ul>
                        <span>
                            Our mission is to help you save time, reduce errors, and focus on what matters most. We believe that automation is the key to unlocking your full potential, and we&apos;re here to support you every step of the way.
                        </span>

                        {/* <span>
                            The goal of this blog is to provide high-quality, practical content to help you learn and grow. We cover a
                            wide range of topics, including web development, programming, and technology.
                        </span> */}
                    </p>
                    <div className="flex items-center gap-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src='/me.jpeg'
                                width={40}
                                height={40}
                                alt="Lalit Sharma"
                                className="rounded-full object-center object-cover"
                                layout="responsive"
                            />
                        </div>
                        <div className="text-primary text-base xl:text-h6 2xl:text-h5 font-medium flex flex-col">
                            <p className=" leading-tight">Lalit Sharma</p>
                            <p className="text-primary text-sm"> Founder & Developer

                            </p>
                            <Clipboard />
                        </div>
                    </div>
                </div>
            </div >
            <Integrations />
            <h2 className="mt-8 font-semibold text-lg md:text-2xl self-start mx-5 xs:mx-10 sm:mx-12 md:mx-16 lg:mx-20 text-light-gray dark:font-normal">
                Have a project in mind? Reach out to me 📞 from{' '}
                <Link href="http://litsharmadev.tech/" className="!underline underline-offset-2">
                    here
                </Link>{' '}
                and let&apos;s make it happen.
            </h2>
        </>
    );
}
