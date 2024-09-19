import { Metadata } from 'next';
import EscortDetailPage from 'views/guestViews/details/EscortDetailPage';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const model = params.id;
  return {
    alternates: {
      canonical: `https://flirtbate.com/details/${model}`
    }
  };
}

const WorkerDetailPage = () => {
  return <>{<EscortDetailPage />}</>;
};

export default WorkerDetailPage;
