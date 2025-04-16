import { Step } from "../models/step/step.model";

export const STEPS: Step[]= [
    new Step('00', 'Welcome', 'Let\'s get started', '', true, 'icons/00.svg'),
    new Step('01', 'Logo', 'Vector files', '', true, 'icons/01.svg'),
    new Step('02', 'Login screen', 'Image in jpg', '', true, 'icons/02.svg'),
    new Step('03', 'Color', 'Hex codes', '', true, 'icons/03.svg'),
    new Step('04', 'App icon', 'Vector files', '', false, 'icons/04.svg'),
    new Step('05', 'Home tab header', 'Image in jpg', '', false, 'icons/05.svg'),
    new Step('06', 'Tab header', 'Image in jpg', '', false, 'icons/06.svg'),
    new Step('07', 'Onboarding slides', 'Images in jpg', '', false, 'icons/07.svg'),
    new Step('08', 'Loyalty button icon', 'Vector files', '', false, 'icons/08.svg'),
    new Step('09', 'Other files', 'Any format', '', false, 'icons/09.svg'),
    new Step('10', 'Check & submit', 'Celebrate', '', false, 'icons/10.svg'),
]