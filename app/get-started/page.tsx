import { Metadata } from 'next';
import { GetStartedRequestForm } from '@/components/sections/GetStartedRequestForm';

export const metadata: Metadata = {
  title: 'Get Started — Cluso Infolink',
  description: 'Complete the Cluso Account Request Form to set up your background verification account.',
};

export default function GetStartedAliasPage() {
  return <GetStartedRequestForm />;
}
