const numeric=['liquiditySol','top10Percent','buyCount','sellCount','orderSol','exposureSol'];
export function evaluate(s,c,now=Date.now()){
 const reasons=[];
 if(c.mode!=='dry-run')throw Error('BENKO supports dry-run only.');
 for(const k of ['maxAgeSeconds','maxOrderSol','maxExposureSol','minLiquiditySol','maxTop10Percent','minBuyRatio','minTrades','slippageBps'])if(!Number.isFinite(c[k])||c[k]<0)throw Error('Invalid configuration: '+k);
 if(c.maxAgeSeconds===0||c.maxOrderSol===0||c.maxExposureSol<c.maxOrderSol||c.slippageBps>10000||!Number.isInteger(c.slippageBps)||c.maxTop10Percent>100||c.minBuyRatio>1)throw Error('Invalid risk limits');
 if(!s||typeof s!=='object')return {reasons:['Missing snapshot'],buyRatio:0};
 for(const k of numeric)if(!Number.isFinite(s[k])||s[k]<0)reasons.push('Invalid '+k);
 if(!Number.isInteger(s.buyCount)||!Number.isInteger(s.sellCount))reasons.push('Trade counts must be integers');
 if(s.top10Percent>100)reasons.push('Invalid concentration percentage');
 if(typeof s.sample!=='boolean')reasons.push('Explicit sample flag required');
 if(typeof s.source!=='string'||!s.source.startsWith('https://'))reasons.push('Missing source URL');
 const t=Date.parse(s.observedAt);if(!Number.isFinite(now)||!Number.isFinite(t)||t>now||now-t>c.maxAgeSeconds*1000)reasons.push('Stale or invalid observation time');
 if(s.quote!=='SOL')reasons.push('Only SOL quote snapshots supported');
 if(!['pump-bonding-curve','pumpswap'].includes(s.venue))reasons.push('Unknown venue');
 if(s.orderSol<=0||s.orderSol>c.maxOrderSol)reasons.push('Order amount outside limits');
 if(s.exposureSol+s.orderSol>c.maxExposureSol)reasons.push('Exposure limit exceeded');
 if(s.liquiditySol<c.minLiquiditySol)reasons.push('Insufficient liquidity');
 if(s.top10Percent>c.maxTop10Percent)reasons.push('Holder concentration too high');
 if(!s.sample)reasons.push('External snapshot provenance is not authenticated; observation only');
 const total=s.buyCount+s.sellCount;const buyRatio=total>0?s.buyCount/total:0;
 return {reasons,buyRatio,total};
}
