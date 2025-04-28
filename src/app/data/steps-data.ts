import { Step } from "./step.model";

export const STEPS: Step[]= [
    new Step('00', 'Welcome', 'Let\'s get started', [], true, 'icons/step-idle/00.svg', 'icons/step-active/00.svg', true, false),
    new Step('01', 'Logo', 'Vector files', [], true, 'icons/step-idle/01.svg', 'icons/step-active/01.svg', false, false),
    new Step('02', 'Login screen', 'Image in jpg', [], true, 'icons/step-idle/02.svg', 'icons/step-active/02.svg', false, false),
    new Step('03', 'Color', 'Hex codes', [], true, 'icons/step-idle/03.svg', 'icons/step-active/03.svg', false, false),
    new Step('04', 'App icon', 'Vector files', [], false, 'icons/step-idle/04.svg', 'icons/step-active/04.svg', false, false),
    new Step('05', 'Home tab header', 'Image in jpg', [], false, 'icons/step-idle/05.svg', 'icons/step-active/05.svg', false, false),
    new Step('06', 'Tab header', 'Image in jpg', [], false, 'icons/step-idle/06.svg', 'icons/step-active/06.svg', false, false),
    new Step('07', 'Onboarding slides', 'Images in jpg', [], false, 'icons/step-idle/07.svg', 'icons/step-active/07.svg', false, false),
    new Step('08', 'Loyalty button icon', 'Vector files', [], false, 'icons/step-idle/08.svg', 'icons/step-active/08.svg', false, false),
    new Step('09', 'Other files', 'Any format', [], false, 'icons/step-idle/09.svg', 'icons/step-active/09.svg', false, false),
    new Step('10', 'Check & submit', 'Celebrate', [], false, 'icons/step-idle/10.svg', 'icons/step-active/10.svg', false, false),
]