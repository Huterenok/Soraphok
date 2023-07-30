
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'components/home/Button';
import { InfoCard } from 'components/home/InfoCard';

const playground = '/playground';

export async function getStaticProps () {
  return {
    props: {} // will be passed to the page component as props
  };
}

const InfoCardData = [
  {
    title: 'AI',
    desc: 'AI helps teachers to create a course: to give ideas, to better formulate ideas, to answer questions about the site. And for students it explains topics, creates and checks homework'
  },
  {
    title: 'Blockchain and gamification',
    desc: 'With the help of blockchain, NFT technologies, we have integrated a powerful system of GAMIFICATION for learners in every course'
  },
  {
    title: 'A new approach for learning',
    desc: 'Our team changed the approach and outlook on training and made a one-of-a-kind site'
  }
];

export default function Home () {
  return (
    <>
      <Head>
        <title>Soraphok</title>
      </Head>
      <div className="mx-8 pt-24 md:mx-24 lg:mx-40 xl:mx-80 2xl:mx-auto 2xl:max-w-4xl">
        <div className="mt-24 text-center">
          <h1 className="text-4xl font-medium sm:text-6xl xl:text-8xl">
            The
            {' '}
            <span className="text-nord10 dark:text-nord9">
              most unique platform
            </span>
            {' '}
            for creating online courses
          </h1>
          <p className="mt-6 text-lg font-light sm:text-2xl">
            Using artificial intelligence and blockchain
          </p>
          <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link className="hidden md:block" href={playground}>
              <Button text="PLAYGROUND" icon="gamepad" />
            </Link>
            <a
              className="hidden md:block"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <Button text="Created courses" icon="view_cozy" />
            </a>
          </div>
        </div>
        <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-2">
          {InfoCardData.map(data => (
            <InfoCard key={data.title} title={data.title} desc={data.desc} />
          ))}
        </div>
      </div>
    </>
  );
}
