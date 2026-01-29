import ServicePageLayout from '@/components/arch/ServicePageLayout';

export default function ConservationPage() {
    return (
        <ServicePageLayout
            title="Conservation & Heritage"
            subtitle="Services / Conservation"
            description="We have extensive experience in working with listed buildings and heritage sites particularly in Tamil Nadu. Our approach is one of sensitivity and respect, balancing the preservation of the past with the needs of the present. We employ traditional craftsmanship alongside modern conservation techniques."
            details={[
                "Heritage Impact Assessments",
                "Restoration",
                "Adaptive Reuse",
                "Conservation Strategy",
                "Structural Consolidation"
            ]}
            image="/portfolio_tamilnadu_heritage_fusion_1767686610582.png"
        />
    );
}
