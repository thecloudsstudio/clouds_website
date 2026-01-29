import ServicePageLayout from '@/components/arch/ServicePageLayout';

export default function CommercialDesignPage() {
    return (
        <ServicePageLayout
            title="Commercial Design"
            subtitle="Architectural Design / Commercial"
            description="We design workspaces and commercial hubs that foster collaboration, innovation, and well-being. By integrating biophilic design principles and smart building technologies, we create environments that are not only productive but also regenerative. Our commercial projects redefine the corporate identity through sustainable architecture."
            details={[
                "Corporate Headquarters",
                "Tech Parks",
                "Mixed-use Developments",
                "Sustainable Retrofits",
                "Workplace Strategy"
            ]}
            image="/portfolio_chennai_office_sustainable_1767686592674.png"
        />
    );
}
