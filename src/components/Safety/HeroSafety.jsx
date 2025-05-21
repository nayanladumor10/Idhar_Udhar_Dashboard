import React from 'react';
import Safety from './Safety';
import SafetyFeatures from './SafetyFeatures';
import SafetyGuidelines from './SafetyGuidelines';
import EmergencyContact from './EmergencyContact';
import SafetyPartners from './SafetyPartners';
import SafetyBlog from './SafetyBlog';

const HeroSafety = () => {
    return (
        <div>
            <Safety/>
            <SafetyFeatures/>
            <SafetyGuidelines/>
            <EmergencyContact/>
            <SafetyPartners/>
            <SafetyBlog/>
        </div>
    );
}

export default HeroSafety;
