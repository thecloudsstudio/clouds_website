"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Check, Lock, Building2, User, Mail, Target, Sliders, BarChart3, PieChart, FileText, Printer, Download, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

type CalculationState = 'input' | 'lead-gen' | 'result';

type DeploymentPhase = 'pilot' | 'single-line' | 'facility' | 'multi-site';

interface CalculatorData {
    // Config
    deploymentPhase: DeploymentPhase;
    workstations: number;
    timelineMonths: number;
    avgSalary: number;

    // Costs
    hardwareCostPerWS: number;
    softwareLicenseAnnual: number;
    integrationCostPerFacility: number;
    trainingCostInitial: number;
    maintenanceCostAnnual: number;

    // Benefits Assumptions
    defectReduction: number; // %
    currentReworkCost: number; // Annual Value
    trainingReduction: number; // %
    newHiresPerYear: number;
    downtimeReduction: number; // %
    downtimeCost: number; // Annual Value

    // Advanced Assumptions
    trainingHourCost: number;
    trainingHoursBaseline: number;
    discountRate: number; // %
    analysisPeriod: number; // Years
}

const DEFAULTS: CalculatorData = {
    deploymentPhase: 'pilot',
    workstations: 2,
    timelineMonths: 6,
    avgSalary: 750000,
    hardwareCostPerWS: 150000,
    softwareLicenseAnnual: 500000,
    integrationCostPerFacility: 300000,
    trainingCostInitial: 200000,
    maintenanceCostAnnual: 250000,
    defectReduction: 35,
    currentReworkCost: 2000000,
    trainingReduction: 40,
    newHiresPerYear: 10,
    downtimeReduction: 20,
    downtimeCost: 1500000,
    trainingHourCost: 1500,
    trainingHoursBaseline: 80,
    discountRate: 10,
    analysisPeriod: 5
};

export default function ROICalculator() {
    const [step, setStep] = useState<CalculationState>('input');
    const [data, setData] = useState<CalculatorData>(DEFAULTS);
    const [activeTab, setActiveTab] = useState<'cost' | 'benefit' | 'annual' | 'scenarios'>('cost');
    const [showDemoModal, setShowDemoModal] = useState(false);

    // Lead Gen State
    const [lead, setLead] = useState({
        name: "",
        email: "",
        company: "",
        role: "",
        industry: "Automotive",
        purpose: "Evaluate for Purchase"
    });

    // Calculated Results
    const [results, setResults] = useState<any>(null);

    // Update workstation defaults based on phase
    const handlePhaseChange = (phase: DeploymentPhase) => {
        let wsCount = 2;
        if (phase === 'pilot') wsCount = 2;
        if (phase === 'single-line') wsCount = 8;
        if (phase === 'facility') wsCount = 40;
        if (phase === 'multi-site') wsCount = 120;

        setData(prev => ({
            ...prev,
            deploymentPhase: phase,
            workstations: wsCount
        }));
    };

    const calculate = () => {
        const { workstations, timelineMonths, analysisPeriod, discountRate, hardwareCostPerWS, softwareLicenseAnnual, integrationCostPerFacility, trainingCostInitial, maintenanceCostAnnual, defectReduction, currentReworkCost, trainingReduction, newHiresPerYear, downtimeReduction, downtimeCost, trainingHourCost, trainingHoursBaseline, avgSalary } = data;

        const rate = discountRate / 100;

        // Facilities Logic
        const facilitiesCount = Math.ceil(workstations / 20);

        // Costs
        const hardwareCost = hardwareCostPerWS * workstations;
        const dataCost = workstations * 50000;
        const initialSoftware = softwareLicenseAnnual * facilitiesCount;
        const initialIntegration = integrationCostPerFacility * facilitiesCount;
        const initialTraining = trainingCostInitial * facilitiesCount;

        // Ongoing
        const annualSoftware = softwareLicenseAnnual * facilitiesCount;
        const annualMaintenance = maintenanceCostAnnual * facilitiesCount;

        const totalInvestment = hardwareCost + dataCost + initialSoftware + initialIntegration + initialTraining +
            (annualMaintenance * (analysisPeriod - 1)) + (annualSoftware * (analysisPeriod - 1));

        // Benefits Calculation
        const reworkBenefitAnnual = currentReworkCost * (defectReduction / 100);
        const trainingBenefitAnnual = newHiresPerYear * trainingHoursBaseline * (trainingReduction / 100) * trainingHourCost;
        const downtimeBenefitAnnual = downtimeCost * (downtimeReduction / 100);
        const qualityBenefitAnnual = reworkBenefitAnnual * 0.4; // Reduced recalls assumption

        const productivityGainPercent = 0.05;
        const avgWorkerCost = avgSalary * 0.6;
        const productivityBenefitAnnual = (workstations * 8) * avgWorkerCost * productivityGainPercent;

        const annualBenefits = reworkBenefitAnnual + trainingBenefitAnnual + downtimeBenefitAnnual + qualityBenefitAnnual + productivityBenefitAnnual;
        const totalBenefits = annualBenefits * analysisPeriod;

        const netROI = totalBenefits - totalInvestment;
        const roiPercentage = (netROI / totalInvestment) * 100;

        // Payback
        const monthlyBenefit = annualBenefits / 12;
        let paybackMonths = 0;
        let remaining = totalInvestment;
        for (let m = 1; m <= analysisPeriod * 12; m++) {
            remaining -= monthlyBenefit;
            if (remaining <= 0) {
                paybackMonths = m;
                break;
            }
        }

        // NPV
        let npv = -totalInvestment;
        for (let y = 1; y <= analysisPeriod; y++) {
            npv += (annualBenefits / Math.pow(1 + rate, y));
        }

        // Breakdown Data
        const costs = {
            hardware: hardwareCost,
            integration: initialIntegration,
            training: initialTraining,
            data: dataCost,
            software: annualSoftware * analysisPeriod,
            maintenance: annualMaintenance * analysisPeriod,
            total: totalInvestment
        };

        const benefits = {
            rework: reworkBenefitAnnual * analysisPeriod,
            training: trainingBenefitAnnual * analysisPeriod,
            downtime: downtimeBenefitAnnual * analysisPeriod,
            quality: qualityBenefitAnnual * analysisPeriod,
            productivity: productivityBenefitAnnual * analysisPeriod,
            total: totalBenefits,
            annualTotal: annualBenefits
        };

        // Annual Table
        const annualTable = [];
        let cumNet = -totalInvestment;
        for (let i = 1; i <= analysisPeriod; i++) {
            const yInv = i === 1 ? totalInvestment : 0; // Simplified cash flow view: all upfront for TCO sum, though reality spreads maintenance.
            // Making correct cash flow for table:
            // Year 1: Upfronts + Year 1 Maint/Soft? Usually TCO 'Total Investment' treats Maint as ongoing.
            // Let's use simple logic: Year 0 Investment vs Annual Benefit? Or Year 1 Investment?
            // Prompt Logic: "yearInvestment = year === 1 ? yearOneCosts : 0;" where yearOneCosts = totalInvestment.
            // This implies the TCO Sum is treated as fully realized cost for simple table. 
            // We'll stick to that for parity.

            const yBen = annualBenefits;
            const yNet = yBen - yInv;
            cumNet += yNet;
            annualTable.push({ year: i, investment: yInv, benefits: yBen, net: yNet, cumulative: cumNet });
        }

        // Scenarios
        const scenarios = {
            conservative: {
                benefits: totalBenefits * 0.75,
                net: (totalBenefits * 0.75) - totalInvestment,
                roi: (((totalBenefits * 0.75) - totalInvestment) / totalInvestment) * 100,
                payback: paybackMonths ? Math.round(paybackMonths * 1.33) : 0
            },
            optimistic: {
                benefits: totalBenefits * 1.25,
                net: (totalBenefits * 1.25) - totalInvestment,
                roi: (((totalBenefits * 1.25) - totalInvestment) / totalInvestment) * 100,
                payback: paybackMonths ? Math.round(paybackMonths * 0.8) : 0
            }
        };

        setResults({
            metrics: {
                totalInvestment,
                totalBenefits,
                netROI,
                roiPercentage,
                paybackMonths,
                npv
            },
            costs,
            benefits,
            annualTable,
            scenarios
        });
    };

    // Calculate immediately on load and data change if in result mode
    useEffect(() => {
        if (step === 'result') calculate();
    }, [data]);

    const handleInitialSubmit = () => {
        calculate();
        setStep('lead-gen');
    };

    const handleLeadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('result');
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const handleExportCSV = () => {
        if (!results) return;

        const rows = [
            ['Manufacturing AI TCO Analysis'],
            ['Generated Date', new Date().toLocaleDateString()],
            [''],
            ['CONFIGURATION'],
            ['Deployment Phase', data.deploymentPhase],
            ['Workstations', data.workstations],
            ['Analysis Period', `${data.analysisPeriod} Years`],
            [''],
            ['KEY RESULTS'],
            ['Total Investment', results.metrics.totalInvestment],
            ['Total Benefits', results.metrics.totalBenefits],
            ['Net ROI', results.metrics.netROI],
            ['ROI %', `${results.metrics.roiPercentage.toFixed(1)}%`],
            ['Payback Period', `${results.metrics.paybackMonths} Months`],
        ];

        let csvContent = "data:text/csv;charset=utf-8,"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "ARGIS_ROI_Report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-6xl mx-auto relative">
            <style jsx global>{`
                @media print {
                    body * { visibility: hidden; }
                    #print-report-container, #print-report-container * { visibility: visible; }
                    #print-report-container { 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 100%; 
                        background: white !important;
                        color: black !important;
                        display: block !important;
                        z-index: 9999;
                    }
                    .no-print { display: none !important; }
                    
                    /* Page Breaks */
                    .page-break { page-break-before: always; }
                    .avoid-break { page-break-inside: avoid; }
                }
            `}</style>
            {/* New Compact Stepper inside Card Header effectively, or just keep top level */}
            <div className="flex items-center justify-center mb-12 no-print">
                {[
                    { id: 'input', label: 'Project Config' },
                    { id: 'lead-gen', label: 'Details' },
                    { id: 'result', label: 'Analysis' }
                ].map((s, idx) => (
                    <div key={s.id} className="flex items-center">
                        <div className={`flex items-center gap-3 ${step === s.id ? 'text-gray-900' : (step === 'result' || (step === 'lead-gen' && s.id === 'input')) ? 'text-gray-400' : 'text-gray-400/50'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-sm font-medium ${step === s.id ? 'border-gray-900 bg-gray-100' : 'border-current'}`}>
                                {idx + 1}
                            </div>
                            <span className="text-sm font-medium uppercase tracking-wider">{s.label}</span>
                        </div>
                        {idx < 2 && <div className="w-16 h-px bg-gray-200 mx-4" />}
                    </div>
                ))}
            </div>

            <div className={`bg-white border border-gray-200 rounded-2xl overflow-hidden min-h-[600px] printable-report shadow-sm ${step === 'result' ? 'p-0' : 'p-8 md:p-12'}`}>
                <AnimatePresence mode="wait">

                    {/* STEP 1: CONFIG */}
                    {step === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-3xl mx-auto"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Configure Production Scenario</h2>
                            <p className="text-gray-500 text-center mb-10">Start by defining your facility scope and current costs.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">Deployment Phase</label>
                                    <select
                                        value={data.deploymentPhase}
                                        onChange={(e) => handlePhaseChange(e.target.value as DeploymentPhase)}
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-black outline-none transition-colors"
                                    >
                                        <option value="pilot">Phase 1: Pilot (1-2 Workstations)</option>
                                        <option value="single-line">Phase 2: Single Line (5-10 Workstations)</option>
                                        <option value="facility">Phase 3: Full Facility (20+ Workstations)</option>
                                        <option value="multi-site">Phase 4: Multi-Site (3-5 Facilities)</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">Number of Workstations</label>
                                    <input
                                        type="number"
                                        value={data.workstations}
                                        onChange={(e) => setData({ ...data, workstations: Number(e.target.value) })}
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-black outline-none transition-colors"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">Current Annual Rework/Scrap Cost (₹)</label>
                                    <input
                                        type="number"
                                        value={data.currentReworkCost}
                                        onChange={(e) => setData({ ...data, currentReworkCost: Number(e.target.value) })}
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-black outline-none transition-colors"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">Avg. Annual Downtime Cost (₹)</label>
                                    <input
                                        type="number"
                                        value={data.downtimeCost}
                                        onChange={(e) => setData({ ...data, downtimeCost: Number(e.target.value) })}
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-black outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <Button onClick={handleInitialSubmit} className="w-full md:w-auto px-12 py-4 text-lg">
                                    Proceed to Calculation <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: LEAD GEN */}
                    {step === 'lead-gen' && (
                        <motion.div
                            key="lead-gen"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-xl mx-auto"
                        >
                            <div className="flex items-center gap-3 mb-6 justify-center">
                                <Lock className="w-6 h-6 text-gray-400" />
                                <h2 className="text-2xl font-bold text-gray-900">Unlock Detailed Report</h2>
                            </div>
                            <p className="text-gray-500 mb-8 text-center">Enter your details to generate the comprehensive ROI and TCO analysis.</p>

                            <form onSubmit={handleLeadSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                                    <input
                                        required
                                        value={lead.name}
                                        onChange={(e) => setLead({ ...lead, name: e.target.value })}
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-black outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Work Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={lead.email}
                                        onChange={(e) => setLead({ ...lead, email: e.target.value })}
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-black outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Company</label>
                                    <input
                                        required
                                        value={lead.company}
                                        onChange={(e) => setLead({ ...lead, company: e.target.value })}
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-black outline-none transition-colors"
                                    />
                                </div>
                                <Button type="submit" className="w-full py-4 text-lg">
                                    Generate Report
                                </Button>
                            </form>
                        </motion.div>
                    )}

                    {/* STEP 3: DASHBOARD */}
                    {step === 'result' && results && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col md:flex-row h-full min-h-[800px]"
                        >
                            {/* SIDEBAR: Advanced Controls */}
                            <div className="w-full md:w-80 bg-gray-50 border-r border-gray-200 p-6 flex-shrink-0 overflow-y-auto max-h-[1000px] no-print">
                                <div className="flex items-center gap-2 mb-6 text-gray-900 font-semibold">
                                    <Sliders className="w-4 h-4" /> Assumptions
                                </div>

                                <div className="space-y-8">
                                    {/* Benefits Sliders */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase">Input Tweaks</h4>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm text-gray-300">
                                                <span>Defect Reduction</span>
                                                <span>{data.defectReduction}%</span>
                                            </div>
                                            <input
                                                type="range" min="10" max="90" step="5"
                                                value={data.defectReduction}
                                                onChange={(e) => setData({ ...data, defectReduction: Number(e.target.value) })}
                                                className="w-full accent-black"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm text-gray-700">
                                                <span>Training Savings</span>
                                                <span>{data.trainingReduction}%</span>
                                            </div>
                                            <input
                                                type="range" min="10" max="90" step="5"
                                                value={data.trainingReduction}
                                                onChange={(e) => setData({ ...data, trainingReduction: Number(e.target.value) })}
                                                className="w-full accent-black"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm text-gray-700">
                                                <span>Downtime Reduction</span>
                                                <span>{data.downtimeReduction}%</span>
                                            </div>
                                            <input
                                                type="range" min="5" max="50" step="5"
                                                value={data.downtimeReduction}
                                                onChange={(e) => setData({ ...data, downtimeReduction: Number(e.target.value) })}
                                                className="w-full accent-black"
                                            />
                                        </div>
                                    </div>

                                    {/* Cost Inputs */}
                                    <div className="space-y-4 pt-4 border-t border-gray-200">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase">Cost Base</h4>
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-500">HW Cost / Station (₹)</label>
                                                <input
                                                    type="number"
                                                    value={data.hardwareCostPerWS}
                                                    onChange={(e) => setData({ ...data, hardwareCostPerWS: Number(e.target.value) })}
                                                    className="w-full bg-white border border-gray-200 text-sm p-2 rounded text-gray-900 outline-none focus:border-black transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-500">Annual License (₹)</label>
                                                <input
                                                    type="number"
                                                    value={data.softwareLicenseAnnual}
                                                    onChange={(e) => setData({ ...data, softwareLicenseAnnual: Number(e.target.value) })}
                                                    className="w-full bg-white border border-gray-200 text-sm p-2 rounded text-gray-900 outline-none focus:border-black transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-500">Analysis Period (Years)</label>
                                                <select
                                                    value={data.analysisPeriod}
                                                    onChange={(e) => setData({ ...data, analysisPeriod: Number(e.target.value) })}
                                                    className="w-full bg-white border border-gray-200 text-sm p-2 rounded text-gray-900 outline-none focus:border-black transition-colors"
                                                >
                                                    <option value={3}>3 Years</option>
                                                    <option value={5}>5 Years</option>
                                                    <option value={7}>7 Years</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <Button onClick={() => setStep('input')} variant="outline" className="w-full text-sm">
                                            Reset All
                                        </Button>
                                    </div>

                                    {/* Book Demo Button in Sidebar */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <Button
                                            onClick={() => setShowDemoModal(true)}
                                            className="w-full bg-black text-white hover:bg-gray-800"
                                        >
                                            <Calendar className="w-4 h-4 mr-2" /> Book a Demo
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* MAIN COMPONENTS */}
                            <div className="flex-1 p-8 bg-white overflow-y-auto">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">TCO Analysis Report</h2>
                                        <p className="text-gray-500 text-sm">5-Year Projection based on {data.workstations} Workstations</p>
                                    </div>
                                    <div className="flex gap-2 no-print">
                                        <button
                                            onClick={handleExportCSV}
                                            title="Export CSV"
                                            className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors"
                                        >
                                            <FileText className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={handlePrint}
                                            title="Print / Save as PDF"
                                            className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors"
                                        >
                                            <Printer className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Top Metrics Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                                        <div className="text-gray-500 text-xs uppercase font-medium mb-1">5-Year Investment</div>
                                        <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.metrics.totalInvestment)}</div>
                                        <div className="text-xs text-gray-500 mt-1">Capex + Opex</div>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                                        <div className="text-gray-500 text-xs uppercase font-medium mb-1">Total Benefits</div>
                                        <div className="text-2xl font-bold text-green-600">{formatCurrency(results.metrics.totalBenefits)}</div>
                                        <div className="text-xs text-gray-500 mt-1">Cost Savings</div>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                                        <div className="text-gray-500 text-xs uppercase font-medium mb-1">Net ROI</div>
                                        <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.metrics.netROI)}</div>
                                        <div className="text-xs text-green-600 mt-1">{results.metrics.roiPercentage.toFixed(0)}% Return</div>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                                        <div className="text-gray-500 text-xs uppercase font-medium mb-1">Payback Period</div>
                                        <div className="text-2xl font-bold text-gray-900">{results.metrics.paybackMonths} Months</div>
                                        <div className="text-xs text-gray-500 mt-1">Break-even time</div>
                                    </div>
                                </div>

                                {/* Tabs Navigation */}
                                <div className="border-b border-gray-200 mb-6 flex gap-8">
                                    {[
                                        { id: 'cost', label: 'Cost Breakdown', icon: PieChart },
                                        { id: 'benefit', label: 'Benefit Analysis', icon: BarChart3 },
                                        { id: 'annual', label: 'Cash Flow', icon: FileText },
                                        { id: 'scenarios', label: 'Scenarios', icon: Target },
                                    ].map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setActiveTab(t.id as any)}
                                            className={`flex items-center gap-2 pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === t.id ? 'border-black text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                        >
                                            <t.icon className="w-4 h-4" /> {t.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="min-h-[300px]">
                                    {activeTab === 'cost' && (
                                        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-gray-100 text-gray-500 font-medium">
                                                    <tr>
                                                        <th className="p-4">Cost Category</th>
                                                        <th className="p-4 text-right">Amount (₹)</th>
                                                        <th className="p-4 text-right">% of Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                                    {[
                                                        { label: 'Hardware (Edge Devices, Cameras)', val: results.costs.hardware },
                                                        { label: 'Integration & Setup', val: results.costs.integration },
                                                        { label: 'Initial Training', val: results.costs.training },
                                                        { label: 'Data Annotation', val: results.costs.data },
                                                        { label: `Software Licenses (${data.analysisPeriod} Years)`, val: results.costs.software },
                                                        { label: `Maintenance (${data.analysisPeriod} Years)`, val: results.costs.maintenance },
                                                    ].map((Row, i) => (
                                                        <tr key={i} className="hover:bg-gray-100">
                                                            <td className="p-4">{Row.label}</td>
                                                            <td className="p-4 text-right">{formatCurrency(Row.val)}</td>
                                                            <td className="p-4 text-right">{((Row.val / results.costs.total) * 100).toFixed(1)}%</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="bg-gray-100 font-bold text-gray-900">
                                                        <td className="p-4">TOTAL TCO</td>
                                                        <td className="p-4 text-right text-lg">{formatCurrency(results.costs.total)}</td>
                                                        <td className="p-4 text-right">100%</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {activeTab === 'benefit' && (
                                        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-gray-100 text-gray-500 font-medium">
                                                    <tr>
                                                        <th className="p-4">Benefit Category</th>
                                                        <th className="p-4 text-right">Annual (₹)</th>
                                                        <th className="p-4 text-right">{data.analysisPeriod}-Year Total (₹)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                                    {[
                                                        { label: 'Rework/Scrap Reduction', val: results.benefits.rework },
                                                        { label: 'Training Time Savings', val: results.benefits.training },
                                                        { label: 'Downtime Reduction', val: results.benefits.downtime },
                                                        { label: 'Quality Improvement', val: results.benefits.quality },
                                                        { label: 'Productivity Gains', val: results.benefits.productivity },
                                                    ].map((Row, i) => (
                                                        <tr key={i} className="hover:bg-gray-100">
                                                            <td className="p-4">{Row.label}</td>
                                                            <td className="p-4 text-right">{formatCurrency(Row.val / data.analysisPeriod)}</td>
                                                            <td className="p-4 text-right">{formatCurrency(Row.val)}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="bg-gray-100 font-bold text-gray-900">
                                                        <td className="p-4">TOTAL BENEFITS</td>
                                                        <td className="p-4 text-right">{formatCurrency(results.benefits.annualTotal)}</td>
                                                        <td className="p-4 text-right text-lg">{formatCurrency(results.benefits.total)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {activeTab === 'annual' && (
                                        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-gray-100 text-gray-500 font-medium">
                                                    <tr>
                                                        <th className="p-4">Year</th>
                                                        <th className="p-4 text-right">Investment</th>
                                                        <th className="p-4 text-right">Benefits</th>
                                                        <th className="p-4 text-right">Net</th>
                                                        <th className="p-4 text-right">Cumulative</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                                    {results.annualTable.map((Row: any) => (
                                                        <tr key={Row.year} className="hover:bg-gray-100">
                                                            <td className="p-4 font-medium">Year {Row.year}</td>
                                                            <td className="p-4 text-right">{formatCurrency(Row.investment)}</td>
                                                            <td className="p-4 text-right">{formatCurrency(Row.benefits)}</td>
                                                            <td className="p-4 text-right font-medium">{formatCurrency(Row.net)}</td>
                                                            <td className={`p-4 text-right font-bold ${Row.cumulative > 0 ? 'text-green-600' : 'text-gray-500'}`}>{formatCurrency(Row.cumulative)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {activeTab === 'scenarios' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/50 rounded-full blur-3xl -mr-10 -mt-10" />
                                                <h4 className="font-bold text-gray-900 mb-6">Conservative (-25% Benefit)</h4>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">Total Benefits</span>
                                                        <span className="text-gray-900 font-medium">{formatCurrency(results.scenarios.conservative.benefits)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">Net Value</span>
                                                        <span className="text-gray-900 font-medium">{formatCurrency(results.scenarios.conservative.net)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">ROI</span>
                                                        <span className="text-gray-900 font-medium">{results.scenarios.conservative.roi.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="pt-4 border-t border-gray-200">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-500">Payback</span>
                                                            <span className="text-gray-900 font-bold">{results.scenarios.conservative.payback} Months</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/50 rounded-full blur-3xl -mr-10 -mt-10" />
                                                <h4 className="font-bold text-gray-900 mb-6">Optimistic (+25% Benefit)</h4>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">Total Benefits</span>
                                                        <span className="text-gray-900 font-medium">{formatCurrency(results.scenarios.optimistic.benefits)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">Net Value</span>
                                                        <span className="text-gray-900 font-medium">{formatCurrency(results.scenarios.optimistic.net)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">ROI</span>
                                                        <span className="text-gray-900 font-medium">{results.scenarios.optimistic.roi.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="pt-4 border-t border-gray-200">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-500">Payback</span>
                                                            <span className="text-gray-900 font-bold">{results.scenarios.optimistic.payback} Months</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:col-span-2 bg-blue-50 border border-blue-200 p-4 rounded-lg text-xs text-blue-700">
                                                <strong>Scenario Analysis:</strong> Helpful for risk assessment. Conservative assumes lower adoption or efficiency gains, while Optimistic assumes higher.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* BOOK DEMO MODAL */}
                <AnimatePresence>
                    {showDemoModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.95 }}
                                className="bg-white border border-gray-200 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl relative"
                            >
                                <button
                                    onClick={() => setShowDemoModal(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Book a Demo</h3>
                                    <p className="text-gray-500 mb-6">Schedule a session with our experts to discuss your TCO analysis and implementation plan.</p>

                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Demo Request Sent! We will contact you shortly."); setShowDemoModal(false); }}>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-500 uppercase font-medium">Name</label>
                                                <input required className="w-full bg-white border border-gray-200 rounded p-2 text-gray-900 outline-none focus:border-black" defaultValue={lead.name} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-500 uppercase font-medium">Email</label>
                                                <input required type="email" className="w-full bg-white border border-gray-200 rounded p-2 text-gray-900 outline-none focus:border-black" defaultValue={lead.email} />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500 uppercase font-medium">Company</label>
                                            <input required className="w-full bg-white border border-gray-200 rounded p-2 text-gray-900 outline-none focus:border-black" defaultValue={lead.company} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500 uppercase font-medium">Message (Optional)</label>
                                            <textarea
                                                className="w-full bg-white border border-gray-200 rounded p-2 text-gray-900 h-24 outline-none focus:border-black"
                                                defaultValue={`I am interested in ARGIS for ${data.deploymentPhase} (${data.workstations} workstations). Preliminary ROI Analysis indicates ${results?.metrics?.roiPercentage?.toFixed(0)}% ROI.`}
                                            />
                                        </div>

                                        <Button type="submit" className="w-full mt-4">Confirm Booking</Button>
                                    </form>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* HIDDEN PRINT REPORT TEMPLATE */}
            {results && (
                <div id="print-report-container" className="hidden p-8 max-w-4xl mx-auto bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8 border-b-2 border-black pb-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">ARGIS</h1>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-1">Powered by Clouds</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                            <div className="font-bold text-black mb-1">Impact Analysis Report</div>
                            <div>{new Date().toLocaleDateString()}</div>
                            <div className="mt-1 text-xs">www.thecloudsstudio.com</div>
                            <div className="text-xs">projects@thecloudsstudio.com</div>
                        </div>
                    </div>

                    {/* Report Summary */}
                    <div className="mb-12">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
                                <p className="text-gray-500">Projected TCO and ROI Analysis for {data.workstations} Workstations over {data.analysisPeriod} Years.</p>
                            </div>
                            <div className="text-sm bg-gray-100 px-3 py-1 rounded">
                                Deployment Phase: <span className="font-bold capitalize">{data.deploymentPhase}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-8">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className="text-xs text-gray-500 uppercase">Total Investment</div>
                                <div className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(results.metrics.totalInvestment)}</div>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className="text-xs text-gray-500 uppercase">Net ROI</div>
                                <div className="text-xl font-bold text-green-700 mt-1">{formatCurrency(results.metrics.netROI)}</div>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className="text-xs text-gray-500 uppercase">Return %</div>
                                <div className="text-xl font-bold text-gray-900 mt-1">{results.metrics.roiPercentage.toFixed(0)}%</div>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className="text-xs text-gray-500 uppercase">Payback</div>
                                <div className="text-xl font-bold text-gray-900 mt-1">{results.metrics.paybackMonths} Months</div>
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Cost Breakdown */}
                    <div className="mb-10 avoid-break">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">1. Cost Breakdown</h3>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="p-2">Category</th>
                                    <th className="p-2 text-right">Cost (₹)</th>
                                    <th className="p-2 text-right">%</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { label: 'Hardware (Edge Devices, Cameras)', val: results.costs.hardware },
                                    { label: 'Integration & Setup', val: results.costs.integration },
                                    { label: 'Initial Training', val: results.costs.training },
                                    { label: 'Data Annotation', val: results.costs.data },
                                    { label: `Software Licenses (${data.analysisPeriod} Years)`, val: results.costs.software },
                                    { label: `Maintenance (${data.analysisPeriod} Years)`, val: results.costs.maintenance },
                                ].map((row, i) => (
                                    <tr key={i}>
                                        <td className="p-2">{row.label}</td>
                                        <td className="p-2 text-right">{formatCurrency(row.val)}</td>
                                        <td className="p-2 text-right">{((row.val / results.costs.total) * 100).toFixed(1)}%</td>
                                    </tr>
                                ))}
                                <tr className="font-bold bg-gray-50">
                                    <td className="p-2">TOTAL TCO</td>
                                    <td className="p-2 text-right">{formatCurrency(results.costs.total)}</td>
                                    <td className="p-2 text-right">100%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Section 2: Benefit Analysis */}
                    <div className="mb-10 avoid-break">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">2. Benefit Analysis</h3>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="p-2">Category</th>
                                    <th className="p-2 text-right">Annual Impact (₹)</th>
                                    <th className="p-2 text-right">{data.analysisPeriod}-Year Impact (₹)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { label: 'Rework/Scrap Reduction', val: results.benefits.rework },
                                    { label: 'Training Benefits', val: results.benefits.training },
                                    { label: 'Downtime Reduction', val: results.benefits.downtime },
                                    { label: 'Quality Improvement', val: results.benefits.quality },
                                    { label: 'Productivity Gains', val: results.benefits.productivity },
                                ].map((row, i) => (
                                    <tr key={i}>
                                        <td className="p-2">{row.label}</td>
                                        <td className="p-2 text-right">{formatCurrency(row.val / data.analysisPeriod)}</td>
                                        <td className="p-2 text-right">{formatCurrency(row.val)}</td>
                                    </tr>
                                ))}
                                <tr className="font-bold bg-gray-50">
                                    <td className="p-2">TOTAL BENEFITS</td>
                                    <td className="p-2 text-right">{formatCurrency(results.benefits.annualTotal)}</td>
                                    <td className="p-2 text-right">{formatCurrency(results.benefits.total)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break"></div>

                    {/* Section 3: Cash Flow */}
                    <div className="mb-10 mt-8 avoid-break">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">3. Financial Projections (Cash Flow)</h3>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="p-2">Year</th>
                                    <th className="p-2 text-right">Investment</th>
                                    <th className="p-2 text-right">Benefits</th>
                                    <th className="p-2 text-right">Net Flow</th>
                                    <th className="p-2 text-right">Cumulative Net</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {results.annualTable.map((row: any) => (
                                    <tr key={row.year}>
                                        <td className="p-2 font-medium">Year {row.year}</td>
                                        <td className="p-2 text-right">{formatCurrency(row.investment)}</td>
                                        <td className="p-2 text-right">{formatCurrency(row.benefits)}</td>
                                        <td className="p-2 text-right">{formatCurrency(row.net)}</td>
                                        <td className={`p-2 text-right font-bold ${row.cumulative >= 0 ? 'text-green-700' : 'text-gray-500'}`}>{formatCurrency(row.cumulative)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Section 4: Scenarios */}
                    <div className="mb-8 avoid-break">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">4. Scenario Analysis</h3>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h4 className="font-bold text-gray-800 mb-3">Conservative Scenario</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span>Net Value:</span> <span className="font-medium">{formatCurrency(results.scenarios.conservative.net)}</span></div>
                                    <div className="flex justify-between"><span>ROI:</span> <span className="font-medium">{results.scenarios.conservative.roi.toFixed(1)}%</span></div>
                                    <div className="flex justify-between"><span>Payback:</span> <span className="font-medium">{results.scenarios.conservative.payback} Months</span></div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h4 className="font-bold text-gray-800 mb-3">Optimistic Scenario</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span>Net Value:</span> <span className="font-medium">{formatCurrency(results.scenarios.optimistic.net)}</span></div>
                                    <div className="flex justify-between"><span>ROI:</span> <span className="font-medium">{results.scenarios.optimistic.roi.toFixed(1)}%</span></div>
                                    <div className="flex justify-between"><span>Payback:</span> <span className="font-medium">{results.scenarios.optimistic.payback} Months</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Report Footer */}
                    <div className="border-t-2 border-black pt-4 text-center text-xs text-gray-500 mt-12">
                        <p>&copy; {new Date().getFullYear()} ARGIS - The Clouds Studio. All rights reserved.</p>
                        <p>This report is computer generated for estimation purposes.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
