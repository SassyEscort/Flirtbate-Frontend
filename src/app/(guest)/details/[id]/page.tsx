import { SEO_DATA } from 'constants/seoConstants';
import { Metadata } from 'next';
import { ModelSeoService } from 'services/modelSeo/modelSeo.services';
import EscortDetailPage from 'views/guestViews/details/EscortDetailPage';
import { CallFeatureProvider } from '../../../../../context/CallFeatureContext';
import CallFeature from 'views/protectedViews/callingFeature';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const model = params.id;
  if (model) {
    const res = await ModelSeoService.getModelSeo(model);

    const title = res.title ? res.title : SEO_DATA.TITLE;
    const keywords = res.keywords ? res.keywords : model;
    const description = res.description ? res.description : SEO_DATA.DESCRIPTION;
    const canonicalUrl = `https://flirtbate.com/details/${model}`;

    return {
      title,
      keywords,
      description,
      alternates: {
        canonical: canonicalUrl
      }
    };
  }

  return {};
}

const WorkerDetailPage = () => {
  return (
    <>
      <CallFeatureProvider>
        <CallFeature />
        <EscortDetailPage />
      </CallFeatureProvider>
    </>
  );
};

export default WorkerDetailPage;
