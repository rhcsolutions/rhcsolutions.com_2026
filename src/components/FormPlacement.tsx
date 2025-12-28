'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';

export default function FormPlacement({ position }: { position: 'top' | 'bottom' }) {
    const pathname = usePathname();
    const [forms, setForms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/cms/settings');
            if (res.ok) {
                const settings = await res.json();
                setForms(settings.forms || []);
            }
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    if (loading || forms.length === 0) return null;

    // Find forms that match the current slug and position
    const matchingForms = forms.filter(f =>
        f.placement?.pageSlug === pathname &&
        (f.placement?.position || 'bottom') === position
    );

    if (matchingForms.length === 0) return null;

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            {matchingForms.map(form => (
                <div key={form.id} className="mb-12">
                    <h2 className="heading-lg text-center text-gradient mb-8">{form.name}</h2>
                    <ContactForm config={form} />
                </div>
            ))}
        </div>
    );
}
