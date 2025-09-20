import React from 'react';
import AdBanner from '../components/ui/common/AdBanner';
import { StoryFn } from '@storybook/react/*';

export default {
    title: 'Components/AdBanner', // Storybook navigation path
    component: AdBanner,
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['banner', '2*2', '2*4', '3*3', '3*4'], // Enum for type
        },
        onClick: { action: 'clicked' },
    },
};

const Template: StoryFn<typeof AdBanner> = (args: any) => <AdBanner {...args} />;

export const Banner = Template.bind({});
Banner.args = {
    src: '/images/ads/1.png',
    alt: 'Banner Image',
    type: 'banner',
    link: 'https://facebook.com',
};

export const TwoByTwo = Template.bind({});
TwoByTwo.args = {
    src: '/images/ads/2.png',
    alt: '2*2 Image',
    type: '2*2',
};

export const TwoByFour = Template.bind({});
TwoByFour.args = {
    src: '/images/ads/3.png',
    alt: '2*4 Image',
    type: '2*4',
};

export const ThreeByThree = Template.bind({});
ThreeByThree.args = {
    src: '/images/ads/4.png',
    alt: '3*3 Image',
    type: '3*3',
};

export const ThreeByFour = Template.bind({});
ThreeByFour.args = {
    src: '/images/ads/4.png',
    alt: '3*4 Image',
    type: '3*4',
};
