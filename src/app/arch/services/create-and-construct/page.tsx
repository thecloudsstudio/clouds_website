import ServicePageLayout from '@/components/arch/ServicePageLayout';

export default function CreateAndConstructPage() {
    return (
        <ServicePageLayout
            title="Create & Construct"
            subtitle="Services / Integrated Design & Build"
            description="Our 'Create & Construct' service offers a seamless, end-to-end solution for your project. By integrating architectural design, interior design, and construction management under one roof, we eliminate the gaps between disciplines. This single-point responsiblity ensures that the design vision is executed flawlessly on site, on time, and on budget."
            details={[
                "Single Point of Contact",
                "Cost Certainty",
                "Project Management",
                "Quality Control",
                "Turnkey Delivery"
            ]}
            image="/bangalore_villa_courtyard_detail_1767692174458.png"
        />
    );
}
