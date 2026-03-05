import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

const defaultContent = {
    pages: {
        home: {
            heroSubtitle: "Premium Spirits Hub",
            heroTitle: "Crafted by Kaia Distillery. \nDistributed Nationwide.",
            heroDesc: "Welcome to the official Windpomp Liquors portal. We are the authorized national distributor for Kaia Distillery's premium gin, brannas, rum, and more.",
            heroImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80",
            exportTitle: "100% Export Quality",
            exportDesc: "Every bottle of Kaia Alcohol distributed by Windpomp Liquors is refined, meticulously aged, and explicitly certified to meet the highest international Export Quality standards. No compromises.",
            exportImage: "https://images.unsplash.com/photo-1574351658428-ec2b644f77c3?auto=format&fit=crop&q=80",
            featuresTitle: "Why Choose Windpomp Liquors?",
            featuresDesc: "An exclusive sales partnership built on trust. Windpomp Liquors is the official national distributor for Kaia Distillery's expertly crafted spirits.",
            feature1Title: "Certified Legitimacy",
            feature1Desc: "Every drop of Kaia alcohol is vetted, certified, and supplied directly through our master sales agreement. When you order from Windpomp Liquors, you receive authentic Kaia Distillery products straight from the source.",
            feature2Title: "Wholesale Ready",
            feature2Desc: "From a few boxes for your local establishment to full pallet shipments across the country, our logistics are primed for your needs.",
            feature3Title: "National Distribution",
            feature3Desc: "Fast and reliable nationwide delivery. Our dedicated sales team ensures that local liquor compliance is handled seamlessly."
        },
        about: {
            heroSubtitle: "Our Heritage",
            title: "The Windpomp Liquors Story",
            desc1: "Windpomp Liquors is more than just a brand; it's a culmination of passion, tradition, and South African heritage. Born from the legacy of Windpomp Padstal, we have positioned ourselves as a premier distributor of high-end spirits.",
            desc2: "We have entered into an exclusive distribution agreement with the esteemed Kaia Distillery. Currently featuring their highly sought-after Kaia Collection—including Kaia Gin, Kaia Brannas, and Kaia Vodka—we ensure you receive completely authentic masterpieces.",
            desc3: "With our trusted reputation and logistical prowess, Windpomp Liquors serves as the official national sales bridge, delivering Kaia Distillery's premium products to every corner of the country.",
            image: "https://images.unsplash.com/photo-1560159858-29cbcf44fd1e?auto=format&fit=crop&q=80",
            partnerTitle: "Authorized Sales Partner",
            partnerDesc: "When you buy through Windpomp Liquors, you are fully guaranteed authentic, export-quality Kaia Distillery spirits."
        },
        sales: {
            heroSubtitle: "National Distribution",
            heroTitle: "A Nationwide Reach",
            heroDesc: "From the dusty roads of Limpopo to the rolling vineyards of the Western Cape. Windpomp Liquors ensures our premium spirits find their way securely to your venue anywhere in South Africa.",
            logisticsTitle: "Coast to Coast Logistics",
            logisticsDesc1: "Our logistics network is built on the robust foundation of Windpomp Padstal. We understand that whether you're running a bustling club in Gauteng or a quiet boutique hotel in the Karoo, timely delivery is paramount.",
            logisticsDesc2: "We cater to all nine provinces of South Africa. Our dedicated fleet, alongside trusted logistical partners, ensures that whether you order by the box or by the pallet, your premium products arrive in pristine condition and completely compliant with local liquor laws.",
            image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&q=80",
            feature1Title: "Reliable Delivery",
            feature1Desc: "To every corner of South Africa. From major metropolitan hubs like Johannesburg and Cape Town to the most secluded rural venues.",
            feature2Title: "Full Coverage",
            feature2Desc: "Fully servicing Limpopo, North West, Gauteng, Mpumalanga, Free State, KwaZulu-Natal, Northern Cape, Eastern Cape, and the Western Cape.",
            feature3Title: "Compliant Transit",
            feature3Desc: "All necessary waybills, certifications, and compliance documents are meticulously handled by our team for a seamless and legal transit."
        },
        inquiry: {
            subtitle: "Logistics & Supply",
            title: "Wholesale Liquor Sales",
            desc: "Whether you need 10 boxes for an event or a full shipping container for nationwide distribution, Windpomp Liquors is fully equipped to handle your wholesale liquor needs.",
            note: "* All necessary distribution documentation, compliance certificates, and liquor licenses are available upon request."
        },
        shop: {
            heroSubtitle: "Our Collection",
            heroTitle: "Premium Spirits",
            heroDesc: "Explore our meticulously crafted spirits. Available in bulk, boxes, or pallets for personal enjoyment or commercial resale."
        }
    },
    products: [
        { id: 'vodka', name: 'Kaia Vodka', category: 'Vodka', description: 'Triple distilled for ultimate purity.', image: 'https://images.unsplash.com/photo-1605270012917-bf158ce81dc2?auto=format&fit=crop&q=80', sizes: ['750ml', '200ml', '100ml'] },
        { id: 'gin-classic', name: 'Kaia Gin', category: 'Gin', description: 'Botanically infused, crisp and refreshing.', image: 'https://images.unsplash.com/photo-1549441160-5975ff20847f?auto=format&fit=crop&q=80', sizes: ['750ml', '200ml', '100ml'] },
        { id: 'gin-red-berry', name: 'Kaia Red Berry Gin', category: 'Gin', description: 'Sweet and fruity red berry infusion.', image: 'https://images.unsplash.com/photo-1596767508752-6ee1b1ca20d1?auto=format&fit=crop&q=80', sizes: ['750ml'] },
        { id: 'gin-blue-berry', name: 'Kaia Blue Berry Gin', category: 'Gin', description: 'Smooth and vibrant blue berry infusion.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80', sizes: ['750ml'] },
        { id: 'brannas', name: 'Kaia Brannas', category: 'Brandy', description: 'Aged to perfection in oak barrels.', image: 'https://images.unsplash.com/photo-1582222129532-6320a59be5fb?auto=format&fit=crop&q=80', sizes: ['750ml', '200ml', '100ml'] },
        { id: 'whizza', name: 'Kaia Whizza', category: 'Whizza', description: 'A unique blend, signature to our brand.', image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80', sizes: ['750ml', '200ml', '100ml'] },
        { id: 'rum', name: 'Kaia Spiced Rum', category: 'Rum', description: 'Dark, spiced rum with a smooth finish.', image: 'https://images.unsplash.com/photo-1614316272554-4a572a0ec42c?auto=format&fit=crop&q=80', sizes: ['750ml'] },
        { id: 'sambuca-black', name: 'Kaia Black Sambuca', category: 'Sambuca', description: 'Intense anise flavor, dark and smooth.', image: 'https://images.unsplash.com/photo-1634547514300-33d3b769ea8e?auto=format&fit=crop&q=80', sizes: ['750ml', '200ml', '100ml'] },
        { id: 'sambuca-red', name: 'Kaia Red Sambuca', category: 'Sambuca', description: 'Fiery and sweet red sambuca.', image: 'https://images.unsplash.com/photo-1629124401569-b51f893bbcb0?auto=format&fit=crop&q=80', sizes: ['750ml', '200ml', '100ml'] },
        { id: 'sambuca-blue', name: 'Kaia Blue Sambuca', category: 'Sambuca', description: 'Cool and vibrant blue sambuca.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80', sizes: ['750ml', '200ml', '100ml'] }
    ],
    global: {
        footerDesc: "A legacy forged from Windpomp Padstal. Distributing premium Kaia Distillery spirits for national acclaim.",
        address: "N1, Musina, Limpopo, 0900",
        email: "sales@windpompliquors.co.za",
        phone: "079 490 1492",
        welcome: "Wholesale & Distribution",
        company: "Windpomp Liquors",
        availableText: "Available for Pallet & Box Orders",
        navHome: "Home",
        navShop: "Shop",
        navSales: "National Sales",
        navAbout: "Our Story",
        navInquiry: "Wholesale Inquiry"
    }
};

const useContent = () => {
    const [content, setContent] = useState(defaultContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLiveUpdate = (e) => {
            setContent(e.detail);
        };
        window.addEventListener('site-content-update', handleLiveUpdate);
        return () => window.removeEventListener('site-content-update', handleLiveUpdate);
    }, []);

    useEffect(() => {
        const docRef = doc(db, "settings", "content");

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const fetchedData = docSnap.data();
                setContent({
                    ...defaultContent,
                    ...fetchedData,
                    pages: {
                        ...defaultContent.pages,
                        ...(fetchedData.pages || {})
                    }
                });
            } else {
                console.warn("Content document does not exist. Using defaults.");
            }
            setLoading(false);
        }, (error) => {
            console.error("Firestore Error:", error);
            setContent(defaultContent);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const updateContent = async (newContent) => {
        const docRef = doc(db, "settings", "content");
        await setDoc(docRef, newContent);
    };

    return { content, loading, updateContent };
};

export default useContent;
