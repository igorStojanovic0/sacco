import { Helmet } from "react-helmet-async";

type Props = {
    title: string;
    description?: string;
}

const HelmetComponent = ({ title, description}: Props) => {
    return (
        <Helmet >
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

export default HelmetComponent