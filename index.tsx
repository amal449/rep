import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CropPolicyScreen() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const cropPolicies = {
    rice: [
      {
        title: "Fallow Land Cultivation Scheme",
        desc: "₹40,000 per hectare for bringing idle lands under rice cultivation.",
        benefits: [
          "₹40,000 per hectare support",
          "Encourages unused land farming",
          "Higher production incentive",
        ],
        eligibility: "Farmers owning unused agricultural land",
        documents: "Land Record + Farmer ID + Bank Details",
      },
      {
        title: "Kerala State Agriculture Seed Distribution Scheme",
        desc: "Seed distribution support for farmers before Kharif and Rabi seasons by the Kerala State Agriculture Department.",
        benefits: [
          "Free or Subsidized Paddy Seeds",
          "Varieties suited for local climate",
          "Seasonal farming support",
        ],
        eligibility: "Registered farmers in Kerala",
        documents: "Farmer ID + Land Record + Aadhar Card",
      },
      {
        title: "Rural Development & Farmer Support Initiative",
        desc: "Seed support and training programs provided through Krishi Bhavan and local Panchayats for sustainable farming.",
        benefits: [
          "Free or Subsidized Seeds",
          "Training in Organic Farming",
          "High-Yield Variety Guidance",
          "Sustainable Agriculture Workshops",
        ],
        eligibility: "Local registered farmers",
        documents: "Farmer ID + Land Record / Panchayat Registration",
      },
    ],

    coconut: [
      {
        title: "Coconut Development Board Revised Central Assistance",
        desc: "Financial and technical support schemes by Coconut Development Board for productivity, processing, and marketing.",
        benefits: [
          "Area Expansion Subsidy ₹56,000 per hectare",
          "Seedling Subsidy ₹45 per seedling",
          "Support for Processing & Marketing",
          "Export Promotion Assistance",
          "Skill Development Programs",
          "FPO Formation Support",
        ],
        eligibility: "Registered Coconut Farmers / Farmer Groups",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Laying Out of Demonstration Plots (LoDP)",
        desc: "Cluster-based demonstration program to improve coconut productivity using integrated management practices.",
        benefits: [
          "₹35,000 per hectare financial assistance",
          "Paid in two installments via DBT",
          "Support for soil ameliorants & fertilizers",
          "Biofertilizers and biopesticides support",
          "Green manure & intercrop planting materials",
          "30% allocation for women farmers",
          "3% allocation for persons with disabilities",
        ],
        eligibility: "Coconut farmers in selected cluster areas",
        documents: "Farmer ID + Land Record + Bank Details",
      },
    ],

    banana: [
      {
        title: "Crop Insurance & Risk Management (KHDP)",
        desc: "Insurance and credit support scheme for banana farmers under Kerala Horticulture Development Programme.",
        benefits: [
          "Crop Insurance Coverage",
          "Protection from Floods & Droughts",
          "Pest & Disease Protection",
          "Credit Support for Cultivation",
          "Adjusted Premium Rates by Agro-Climatic Zones",
        ],
        eligibility: "Registered or insured Banana Farmers",
        documents: "Farmer ID + Land Record + Bank Details + Aadhar Card",
      },
      {
        title: "Price Support & Procurement Scheme",
        desc: "Kerala Government base price policy ensuring stable income when market prices fall.",
        benefits: [
          "Base Price fixed 20% above production cost",
          "Government Procurement during low market rates",
          "Income Stability for Farmers",
          "Protection from Market Fluctuations",
        ],
        eligibility: "Registered Banana & Horticulture Farmers in Kerala",
      },
      {
        title: "Banana Conservation & Diversity Initiative",
        desc: "Programs in Kerala to preserve local and rare banana varieties through farmer partnerships and research collaboration.",
        benefits: [
          "Protection of Rare & Native Varieties",
          "Support from Banana Banks",
          "Climate Change Resilience",
          "Disease Risk Reduction",
          "Research & Food Security Support",
        ],
        eligibility: "Banana Farmers & Registered Farmer Groups",
      },
    ],
    maize: [
      {
        title: "Hybrid & High-Yield Maize Seed Supply Scheme",
        desc: "Provision of hybrid and high-yield maize seed varieties suitable for Kerala’s altitudinal conditions.",
        benefits: [
          "Access to Hybrid Seed Varieties",
          "High Yield Potential",
          "Climate-Suitable Varieties",
          "Improved Farm Productivity (up to ~15 tonnes per 5 acres)",
        ],
        eligibility: "Registered Maize ",
        documents: "Farmer ID + Land Record + Aadhar Card",
      },
      {
        title: "Technical Assistance for Maize Cultivation",
        desc: "Expert guidance for best cultivation practices, soil-specific variety selection, and pest management.",
        benefits: [
          "Scientific Farming Guidance",
          "Soil-Specific Variety Selection",
          "Crop Management Support",
          "Pest & Disease Control Advice",
          "Higher Yield Optimization",
        ],
        eligibility: "Registered Maize / Corn Farmers",
        documents: "Farmer ID + Land Record",
      },
    ],
    cotton: [
      {
        title: "Pest Surveillance & Crop Protection (CPSS)",
        desc: "ICT-enabled Crop Pest Surveillance System by Kerala Agriculture Department for monitoring pests and diseases.",
        benefits: [
          "Online Plant Clinic for Pest & Disease Identification",
          "Mobile App Alerts & Advisories",
          "Integrated Pest Management Guidance",
          "Bio-Agent & Chemical Control Support",
          "Nutritional Deficiency Monitoring",
        ],
        eligibility: "Registered Cotton & Commercial Crop Farmers",
        documents: "Farmer ID + Land Record / Mobile Registration",
      },
      {
        title: "Cotton Crop Insurance & Risk Management Schemes",
        desc: "Central and State insurance schemes protecting cotton farmers from natural calamities, pests, and weather risks.",
        benefits: [
          "PMFBY Low Premium Insurance (2% Kharif, 1.5% Rabi)",
          "Coverage for Weather, Pest & Disease Losses",
          "State Crop Insurance at Panchayat Level",
          "Weather-Based Compensation for Rainfall & Temperature Deviations",
          "Individual & Group Enrollment Options",
        ],
        eligibility: "Registered Cotton Farmers (Loanee & Non-Loanee)",
        documents: "Farmer ID + Land Record + Bank Details",
      },
    ],
    blackgram: [
      {
        title: "Crop Insurance & Risk Mitigation (PMFBY)",
        desc: "Insurance coverage for blackgram farmers against natural calamities, pests, and unforeseen crop losses.",
        benefits: [
          "Protection from Natural Disasters",
          "Pest & Disease Coverage",
          "Mandatory Enrollment for Loanee Farmers",
          "Self-Registration Option if Bank Defaults",
          "Financial Risk Reduction",
        ],
        eligibility: "Registered Blackgram Farmers (Loanee & Non-Loanee)",
        documents: "Farmer ID + Land Record + Bank / Loan Details",
      },
      {
        title: "Farmer Welfare Fund Support Scheme",
        desc: "Comprehensive welfare assistance provided by Kerala Farmers’ Welfare Fund Board for financial and social security.",
        benefits: [
          "Farmer Pension Support",
          "Medical Aid Assistance",
          "Educational Support for Children",
          "Financial Help During Crop Loss",
          "General Social Security Benefits",
        ],
        eligibility: "Registered Farmers including Blackgram Cultivators",
        documents: "Farmer ID + Welfare Fund Registration / Land Record",
      },
    ],
    chickpea: [
      {
        title: "Crop Pest Surveillance System (CPSS)",
        desc: "ICT-enabled pest monitoring platform by Kerala Agriculture Department providing real-time alerts and crop protection guidance.",
        benefits: [
          "Real-Time Pest Surveillance Alerts",
          "Web & Mobile App Access",
          "Guidance on Disease & Pest Control",
          "Support for Legume Crops including Chickpea",
          "Improved Crop Health Monitoring",
        ],
        eligibility: "Registered Chickpea & Pulse Farmers",
        documents: "Farmer ID + Mobile Registration / Land Record",
      },
      {
        title: "Storage Facility Support",
        desc: "Government warehouse support for corn storage.",
        benefits: ["Warehouse Access", "Low Storage Cost"],
        eligibility: "Corn Farmers",
        documents: "ID + Storage Form",
      },
    ],
    coffee: [
      {
        title: "Carbon Neutral Wayanad Program",
        desc: "Program to increase farmer income while promoting climate-resilient and sustainable coffee cultivation in Wayanad.",
        benefits: [
          "Carbon Neutral Coffee Park Development",
          "Hub-and-Spoke Processing Facilities",
          "Value Addition through Processing & Branding",
          "Climate-Resilient Farming Practices",
          "Carbon Credit Opportunities",
          "Farm Tourism & Coffee Experience Programs",
          "Skill Development for Youth, Women & Tribal Communities",
        ],
        eligibility: "Registered Coffee Farmers and Farmer Groups",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Coffee Development Subsidy & Financial Assistance",
        desc: "Financial assistance programs by the Coffee Board of India to support infrastructure, irrigation, and plantation development.",
        benefits: [
          "Subsidy for Wells, Irrigation Ponds & Drip Systems",
          "Support for Replantation of Old Coffee Plants",
          "Financial Help for Coffee Godowns & Shade Structures",
          "Subsidy for Mechanized Dryers & Pulping Units",
          "Up to 40% Subsidy for General Farmers",
          "75–90% Subsidy for SC/ST Farmers",
        ],
        eligibility:
          "Coffee Farmers with Minimum 1 Acre Plantation (0.5 Acre for SC/ST) or Registered FPO Members",
        documents: "Farmer ID + Land Record + FPO Registration / Bank Details",
      },
    ],
    jute: [
      {
        title: "Minimum Support Price (MSP) & Procurement Scheme",
        desc: "Government procurement support through the Jute Corporation of India when market prices fall below MSP.",
        benefits: [
          "MSP Guarantee ₹5,650 per quintal (2025–26)",
          "Government Procurement when Market Prices Fall",
          "Payment within 72 Hours",
          "Stable Income for Jute Farmers",
        ],
        eligibility: "Registered Jute Farmers with Jute Passbook",
        documents: "Jute Passbook + Aadhaar Linked Bank Account",
      },
      {
        title:
          "ICARE Scheme (Improved Cultivation & Advanced Retting Exercise)",
        desc: "Support program for jute farmers providing improved cultivation practices, seed support, and retting infrastructure.",
        benefits: [
          "Subsidized Certified Jute Seeds",
          "Support for Retting Tank Construction & Maintenance",
          "Soil Health Testing Services",
          "Crop Advisory & Technical Guidance",
          "Drone Monitoring in Selected Districts",
          "Extension Support via KVKs and JCI Centers",
        ],
        eligibility: "Registered Jute Farmers",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Integration with Kerala Agriculture Development Programs",
        desc: "Support from Kerala Agriculture Department through extension services, FPO networks, and crop diversification initiatives.",
        benefits: [
          "Technical Guidance on Soil Health",
          "Agro-Climatic Crop Suitability Support",
          "Access to Agricultural Extension Services",
          "Support through Farmer Producer Organizations (FPOs)",
          "Financial Aid under Crop Diversification Programs",
        ],
        eligibility: "Registered Jute Farmers and Farmer Groups",
        documents: "Farmer ID + Land Record + FPO Registration (if applicable)",
      },
    ],
    kidneybeans: [
      {
        title: "Disaster & Climate Mitigation Support",
        desc: "Government support programs helping bean farmers manage losses from climate fluctuations and natural calamities.",
        benefits: [
          "Compensation for Climate-Related Crop Loss",
          "Crop Insurance Coverage",
          "Input Replenishment Support",
          "Protection from Floods, Droughts & Extreme Weather",
          "Part of Agricultural Resilience Programs",
        ],
        eligibility: "Registered Bean & Vegetable Farmers",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Farmer Welfare Fund Board Support",
        desc: "Kerala Farmers’ Welfare Fund Board provides financial and social security support to farmers and their families.",
        benefits: [
          "Farmer Pension Scheme",
          "Insurance Coverage for Farmers",
          "Medical Treatment Assistance",
          "Educational Support for Children",
          "Marriage Assistance",
          "Financial Support in Case of Farmer's Death",
        ],
        eligibility:
          "Registered Farmers including Bean/Kidney Bean Cultivators",
        documents: "Farmer ID + Welfare Fund Registration / Land Record",
      },
    ],
    lentil: [
      {
        title: "Base Price Guarantee for Pulses & Lentils",
        desc: "Kerala Government base price policy ensuring farmers receive at least 20% above production cost.",
        benefits: [
          "Minimum Price Guarantee for Lentils",
          "Government Procurement During Low Market Prices",
          "Protection from Market Fluctuations",
          "Encourages Pulse Cultivation",
          "Stable and Predictable Farmer Income",
        ],
        eligibility: "Registered Lentil and Pulse Farmers",
      },

      {
        title: "Tenant Farmer Support & Licensing Scheme",
        desc: "Kerala legal framework allowing tenant farmers to cultivate crops and access government benefits even without owning land.",
        benefits: [
          "Access to Agricultural Loans",
          "Eligibility for Crop Insurance",
          "Access to Government Subsidies",
          "Legal Recognition for Tenant Farmers",
          "11-Month Cultivation License",
        ],
        eligibility: "Tenant Farmers cultivating lentils or other crops",
        documents: "Tenant Farmer License + Farmer ID + Bank Details",
      },
    ],
    mango: [
      {
        title: "Rejuvenation of Old or Senile Mango Trees",
        desc: "Financial assistance to restore productivity of old and unproductive mango plantations.",
        benefits: [
          "Up to 50% Subsidy on Rejuvenation Cost",
          "Maximum ₹20,000 per hectare Assistance",
          "Support for Up to 2 Hectares per Farmer",
          "Improves Yield of Existing Orchards",
          "Reduces Need for Complete Replantation",
        ],
        eligibility: "Registered Mango Farmers with Old or Senile Orchards",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Organic Mango Farming Support",
        desc: "Financial assistance for farmers adopting organic mango cultivation and certification.",
        benefits: [
          "₹10,000 per hectare Financial Assistance",
          "Support for up to 4 hectares per Farmer",
          "Group Certification Support up to ₹5,00,000 for 50 hectares",
          "Encourages Chemical-Free Farming",
          "Improves Market Value of Mango Produce",
        ],
        eligibility: "Registered Mango Farmers adopting Organic Certification",
        documents:
          "Farmer ID + Land Record + Organic Certification / Application",
      },
    ],
    mothbeans: [
      {
        title: "Farmers’ Welfare Fund Board Support",
        desc: "Kerala Farmers’ Welfare Fund Board provides financial and social security support for farmers and their families.",
        benefits: [
          "Farmer Pension Scheme",
          "Insurance Coverage for Farmers",
          "Medical Treatment Assistance",
          "Educational Support for Children",
          "Marriage Assistance",
          "Death Benefit Support for Farmer Families",
        ],
        eligibility: "Registered Farmers including Mothbean Cultivators",
        documents: "Farmer ID + Welfare Fund Registration / Land Record",
      },
      {
        title: "Price Support & Procurement for Pulses",
        desc: "Kerala Government base price policy protecting pulse farmers from market price fluctuations.",
        benefits: [
          "Minimum Base Price Guarantee for Pulses",
          "Government Procurement During Low Market Prices",
          "Stable Income for Farmers",
          "Reduced Dependence on Market Intermediaries",
          "Support through Farmer Cooperatives and Self-Help Groups",
        ],
        eligibility: "Registered Pulse Farmers including Mothbean Cultivators",
      },
    ],
    mungbean: [
      {
        title: "Pulse Cultivation & Development Program",
        desc: "Kerala government program promoting pulse cultivation such as mungbean, cowpea, black gram, red gram, and soybean to increase production and farmer income.",
        benefits: [
          "Distribution of Quality Pulse Seeds (up to 10 acres per farmer)",
          "Financial Support for Land Preparation",
          "Irrigation and Cultivation Input Assistance",
          "Seed Multiplication through Seed Villages",
          "Special Support for Tribal Farmers",
          "Technical Support from Kerala Agricultural University (KAU)",
        ],
        eligibility: "Farmers cultivating pulse crops including mothbeans",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Integrated & Natural Farming Initiative (Subhiksha Keralam)",
        desc: "Kerala government program encouraging natural and organic farming practices for pulse crops under the Subhiksha Keralam initiative.",
        benefits: [
          "₹4,000 Incentive for Vermicompost Unit Installation",
          "Promotion of Natural and Organic Farming",
          "Cluster Front Line Demonstrations (FLD) by KVK Kottayam",
          "Use of Biofertilizers and Organic Inputs",
          "Eco-friendly Pest Management using Plant-based Methods",
        ],
        eligibility: "Farmers cultivating pulse crops including mothbeans",
        documents: "Farmer ID + Land Record + Bank Details",
      },
    ],
    muskmelon: [
      {
        title: "Crop Development & Horticulture Assistance",
        desc: "Muskmelon cultivation is supported under the Fruit Development Program to increase production and farmer income through improved cultivation practices and input support.",
        benefits: [
          "Supply of Quality Planting Materials",
          "Area Expansion Support for Commercial & Homestead Cultivation",
          "Pest and Disease Management Assistance",
          "Support for Irrigation and Farm Equipment",
          "Promotion of High-Yielding Varieties (Pusa Sharbati, Arka Jeet, Hara Madhu)",
          "Guidance on Scientific Cultivation Methods",
        ],
        eligibility:
          "Farmers cultivating muskmelon under horticulture programs",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Infrastructure & Post-Harvest Support",
        desc: "Government support for improving storage, transportation, and post-harvest handling of muskmelons to reduce losses and maintain fruit quality.",
        benefits: [
          "Modern Storage Facilities for Fruits",
          "Cold Storage Support to Reduce Post-Harvest Loss",
          "Promotion of Ventilated Transport Systems",
          "Improved Shelf Life for Muskmelons",
          "Better Market Access for Farmers",
        ],
        eligibility:
          "Farmers cultivating muskmelon under horticulture programs",
        documents: "Farmer ID + Land Record + storage form",
      },
      {
        title: "Farmers’ Welfare Fund Board Support",
        desc: "Kerala Farmers’ Welfare Fund Board provides financial security and social welfare support to farmers and their families.",
        benefits: [
          "Farmer Pension Scheme",
          "Insurance Coverage for Farmers",
          "Medical Treatment Financial Assistance",
          "Educational Aid for Farmer’s Children",
          "Marriage Assistance",
          "Death Benefit Support for Farmer Families",
        ],
        eligibility: "Registered Farmers including Muskmelon Cultivators",
        documents: "Farmer ID + Welfare Fund Registration / Land Record",
      },
    ],
    corn: [
      {
        title: "Corn Export Incentive",
        desc: "Encourages export of corn with bonuses.",
        benefits: ["Export Bonus", "Tax Relief"],
        eligibility: "Registered Producers",
        documents: "Farm Certificate",
      },
      {
        title: "Storage Facility Support",
        desc: "Government warehouse support for corn storage.",
        benefits: ["Warehouse Access", "Low Storage Cost"],
        eligibility: "Corn Farmers",
        documents: "ID + Storage Form",
      },
    ],
    orange: [
      {
        title: "Government Support for Orange Cultivation",
        desc: "Kerala promotes orange farming through state initiatives such as the Nelliyampathy Government Farm in Palakkad, focusing on sustainable cultivation and value-added production.",
        benefits: [
          "Promotion of Mandarin Orange Cultivation",
          "Government Demonstration Farms for Training",
          "Pest Management and Scientific Farming Techniques",
          "Production of Value-Added Products (Jam, Squash, Juice)",
          "Improved Farmer Income through Direct Sales",
          "Support for Farm Tourism and Sustainable Agriculture",
        ],
        eligibility:
          "Farmers interested in cultivating oranges under horticulture development programs",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Skill Development, Cluster Support & Financial Aid",
        desc: "Kerala government programs providing training, cluster-based farming support, and financial assistance to improve orange cultivation and farmer income.",
        benefits: [
          "Farmer Training and Skill Development Programs",
          "Nutrient Management and Crop Advisory Support",
          "Cluster-Based Farming Assistance",
          "Financial Aid for Organic Certification",
          "Support for Bio-Gas Plants and Organic Manure Units",
          "Market Integration Programs to Ensure Fair Prices",
        ],
        eligibility:
          "Farmers cultivating oranges under state agriculture and horticulture programs",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Jaiva Karshika Mission & Organic Farming Initiative",
        desc: "Kerala's Jaiva Karshika Mission promotes organic farming by supporting certification, eco-friendly cultivation practices, and marketing of organic produce.",
        benefits: [
          "Support for Organic Certification under NPOP Standards",
          "Technical Guidance for Organic Farming Practices",
          "Promotion of Good Agricultural Practices (GAP)",
          "Encouragement of Bio-fertilizers and Organic Manures",
          "Eco-friendly Pest Control Methods",
          "Support for Women’s Groups and Farmer Clusters for Marketing",
        ],
        eligibility:
          "Farmers practicing or transitioning to organic farming including orange cultivators",
        documents: "Farmer ID + Land Record + Certification / Bank Details",
      },
    ],
    papaya: [
      {
        title: "Technical & Financial Support for Orange Farmers",
        desc: "Kerala Agricultural University (KVK) and the Department of Agriculture provide technical guidance and financial assistance to support orange cultivation and small-scale processing units.",
        benefits: [
          "Technical Guidance on Nursery Management",
          "Support for Proper Planting and Spacing Methods",
          "Soil Health and Pest Management Advisory",
          "Fertilization and Crop Management Training",
          "Assistance in Accessing Government Subsidies",
          "Support for Bank Loans to Establish Processing Units",
        ],
        eligibility:
          "Farmers cultivating oranges or planning to establish orange farms",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Value Addition & Entrepreneurship Development",
        desc: "Government programs support papaya farmers in developing value-added products and small-scale enterprises to increase income.",
        benefits: [
          "Training to Convert Papaya Latex into Value-Added Products",
          "Production of Jam, Jelly, Tooty-Fruity, Pickles and Squash",
          "Support for Small-Scale Farmer Enterprises",
          "Entrepreneur Awareness Programs and Workshops",
          "Skill Development in Papaya Farming and Latex Extraction",
          "Marketing and Product Promotion Guidance",
        ],
        eligibility:
          "Farmers cultivating papaya or interested in papaya-based enterprises",
      },
    ],
    pigeonpeas: [
      {
        title: "Financial Support & Farmer Welfare Schemes",
        desc: "Kerala government welfare programs and market support initiatives that benefit pigeonpea farmers through financial aid and improved market access.",
        benefits: [
          "Farmer Pension and Insurance through Farmers’ Welfare Fund Board",
          "Financial Aid for Medical Treatment and Education",
          "Support during Natural Calamities",
          "Minimum Base Price Support for Agricultural Crops",
          "Market Access through Farmer Producer Organizations (FPOs)",
          "Better Price Realization through Cooperative Procurement",
        ],
        eligibility: "Registered farmers cultivating pigeonpea",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "National Food Security Mission (NFSM - Pulses)",
        desc: "Central government program implemented in Kerala to increase pulse production including pigeonpea through improved seeds, modern cultivation practices, and farmer training.",
        benefits: [
          "Access to High-Yielding and Early-Maturing Pigeonpea Varieties",
          "Distribution of Improved Seeds for Local Agro-Climatic Conditions",
          "Crop Management Packages including Pest Control",
          "Stress-Resilient Crop Varieties",
          "Farmer Training Programs on Cultivation and Post-Harvest Handling",
          "Technical Collaboration with ICRISAT and IIPR",
        ],
        eligibility:
          "Farmers cultivating pigeonpea under the National Food Security Mission",
        documents: "Farmer ID + Land Record ",
      },
    ],
    pomegranate: [
      {
        title: "Financial & Market Support for Pomegranate Farmers",
        desc: "Kerala horticulture development programs provide financial assistance, market support, and value-addition opportunities for pomegranate farmers.",
        benefits: [
          "Subsidies for Crop Establishment and Irrigation",
          "Financial Support through Horticulture Development Programs",
          "Assistance from Kerala Agricultural and Horticultural Development Corporation (KAHDC)",
          "Support through Farmer Producer Organizations (FPOs)",
          "Minimum Price Support During Market Fluctuations",
          "Marketing Support including Grading, Packaging, and Buyer Connections",
          "Encouragement for Value-Added Products like Jam and Dried Fruit",
        ],
        eligibility:
          "Farmers cultivating pomegranate under horticulture development programs",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Farmers Welfare & Digital Support Initiatives",
        desc: "Kerala government welfare programs provide insurance, social security, and digital advisory services to support horticulture farmers including pomegranate cultivators.",
        benefits: [
          "Health and Insurance Coverage through Farmers’ Welfare Fund",
          "Social Security Support for Farmers and Families",
          "Access to Crop Guidance Materials and Farm Guides",
          "Real-Time Training Videos and Agricultural Advisories",
          "Encouragement to Join Farmer Producer Organizations (FPOs)",
          "Better Market Negotiation through Cooperatives",
        ],
        eligibility:
          "Registered farmers cultivating horticulture crops including pomegranate",
        documents:
          "Farmer ID + Land Record + Welfare Registration / Bank Details",
      },
    ],
    watermelon: [
      {
        title: "Price Support & Market Intervention",
        desc: "Kerala government programs help stabilize farmer income by providing base price support and market intervention for crops including watermelon.",
        benefits: [
          "Base Price Guarantee (20% Above Production Cost)",
          "Government Procurement When Market Prices Fall",
          "Sales through Farmer Producer Organizations (FPOs)",
          "Timely Payments for Farmers",
          "Reduction of Distress Sales",
          "Market Stabilization during Surplus or Shortage",
        ],
        eligibility:
          "Farmers cultivating watermelon under horticulture and vegetable development programs",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Farmer Welfare & Crop Development Programs",
        desc: "Kerala government welfare and development programs supporting watermelon farmers through social security, infrastructure, and crop development initiatives.",
        benefits: [
          "Farmer Pension and Insurance through Farmers’ Welfare Fund Board",
          "Medical Aid and Educational Support for Farmer Families",
          "Distribution of Quality Seeds and Nursery Support",
          "Support for Drip Irrigation Systems",
          "Zero-Energy Cold Storage and Community Rain Shelters",
          "Integration with Crop Development and Value Addition Programs",
        ],
        eligibility: "Registered farmers cultivating watermelon",
        documents: "Farmer ID + Land Record + Bank Details",
      },
      {
        title: "Organic & Sustainable Farming Incentives",
        desc: "Kerala promotes sustainable and low-chemical farming practices for crops like watermelon under its organic farming policies.",
        benefits: [
          "Encouragement of Low-Chemical and Organic Cultivation",
          "Improvement of Soil Health and Biodiversity",
          "Support for Eco-Friendly Packaging",
          "Fair-Trade and Organic Certification Assistance",
          "Better Market Value for Organic Produce",
        ],
        eligibility:
          "Farmers practicing or transitioning to organic farming including watermelon cultivators",
        documents: "Farmer ID + Land Record + Certification / Bank Details",
      },
    ],
  };

  const handleSearch = () => {
    const key = search.toLowerCase().trim();
    setResults(cropPolicies[key] || []);
    setSearched(true);
    setExpandedIndex(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.homeButton}>
          <Text style={styles.homeText}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crop Policy Advisory</Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search crop..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* RESULT CARDS */}
        {results.map((result, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, expandedIndex === index && styles.bigCard]}
            onPress={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
            activeOpacity={0.9}
          >
            <Text style={styles.cardTitle}>{result.title}</Text>
            <Text style={styles.cardDesc}>{result.desc}</Text>

            {expandedIndex === index && (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.section}>Benefits</Text>
                {result.benefits.map((item, i) => (
                  <Text key={i} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}

                <Text style={styles.section}>Eligibility</Text>
                <Text style={styles.normal}>{result.eligibility}</Text>

                <Text style={styles.section}>Documents Required</Text>
                <Text style={styles.normal}>{result.documents}</Text>
              </View>
            )}

            {expandedIndex !== index && (
              <Text style={styles.tapText}>Tap to View Details ↓</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* NO RESULT */}
        {searched && results.length === 0 && (
          <Text style={styles.noResult}>No policy found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },

  topBar: {
    backgroundColor: "#1b8f4d",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  homeButton: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  homeText: {
    color: "#1b8f4d",
    fontWeight: "bold",
  },

  searchRow: {
    flexDirection: "row",
    padding: 16,
    gap: 10,
    alignItems: "center",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "white",
  },

  searchButton: {
    backgroundColor: "#1b8f4d",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 10,
  },

  searchText: { color: "white", fontWeight: "bold", fontSize: 15 },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    marginTop: 10,
  },

  bigCard: {
    padding: 22,
  },

  cardTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  cardDesc: { fontSize: 15, color: "#555" },

  section: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
  },

  listItem: {
    fontSize: 15,
    marginTop: 4,
  },

  normal: {
    fontSize: 15,
    marginTop: 4,
  },

  tapText: {
    marginTop: 10,
    color: "#1b8f4d",
    fontWeight: "bold",
  },

  noResult: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "red",
  },
});
