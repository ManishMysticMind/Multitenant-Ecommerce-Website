import { Container } from "react-bootstrap";
import { useGetAdvertisement } from "../../../hooks/api/advertisement";
import AdBanner from "../common/AdBanner";

const Page = ({ id }: { id: number }) => {
  const { data } = useGetAdvertisement(+id);

  return (
    <Container className="my-3 my-sm-5 px-0">
      <AdBanner
        src={data?.file_url}
        alt={data?.alt}
        type="banner"
        link={data?.link_url}
      />
    </Container>
  );
};

export default Page;
