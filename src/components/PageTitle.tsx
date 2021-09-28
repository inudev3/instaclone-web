import { Helmet } from "react-helmet-async";

type Props = {
  title: String;
};

export default function PageTitle({ title }: Props) {
  return (
    <Helmet>
      <title> {title}| Instaclone</title>
    </Helmet>
  );
}
