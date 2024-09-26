import { Metadata } from 'next';
import { ModelSeoService } from 'services/modelSeo/modelSeo.services';
import EscortDetailPage from 'views/guestViews/details/EscortDetailPage';
import { CallFeatureProvider } from '../../../../../context/CallFeatureContext';
import CallFeature from 'views/protectedViews/callingFeature';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const model = params.id;
  if (model) {
    const res = await ModelSeoService.getModelSeo(model);
    const genericTitle = `${res.model_name} - ${res.country_name} Model | Free Sex Call & Adult chat on Flirtbate`;
    const genericDescription = `Connect with ${res.model_name}, a  ${res.country_name} model, for live adult chat and free sex calls on Flirtbate. Enjoy interactive shows and intimate conversations in real-time.`;
    const genericKeywords = `${res.model_name} ${res.country_name} Model Adult chat Free Sex Call Flirtbate`;

    const title = res.title ? res.title : genericTitle;
    const keywords = res.keywords ? res.keywords : genericKeywords;
    const description = res.description ? res.description : genericDescription;
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
