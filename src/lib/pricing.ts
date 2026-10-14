import type {Configuration} from './products';
export type PriceRule={configuration:Configuration;amountCents:number};
export function quoteConfiguration(configuration:Configuration,rules:PriceRule[]):number|null{
 const matches=rules.filter(rule=>(['size','sheets','cover','finish'] as const).every(key=>rule.configuration[key]===configuration[key]));
 if(matches.length!==1)return null;const amount=matches[0].amountCents;return Number.isSafeInteger(amount)&&amount>0?amount:null;
}
export function orderTotal(lines:{amountCents:number;quantity:number}[],shippingCents:number){if(!lines.length||!Number.isSafeInteger(shippingCents)||shippingCents<0)throw new Error('Frete ou itens inválidos');const total=lines.reduce((sum,line)=>{if(!Number.isSafeInteger(line.amountCents)||line.amountCents<=0||!Number.isInteger(line.quantity)||line.quantity<1||line.quantity>99)throw new Error('Item inválido');return sum+line.amountCents*line.quantity},shippingCents);if(!Number.isSafeInteger(total))throw new Error('Total inválido');return total;}
