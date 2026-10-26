import { afterEach, describe, expect, it, vi } from 'vitest';
import { parseSession, getJson, ApiError } from '../../packages/contracts/src/index';
afterEach(()=>vi.unstubAllGlobals());
describe('session contract',()=>{
 it('accepts anonymous without inventing identity',()=>expect(parseSession({authenticated:false})).toEqual({authenticated:false}));
 it('accepts authenticated but incomplete membership explicitly',()=>expect(parseSession({authenticated:true,subject:'synthetic',displayName:'Test',membershipReady:false})).toHaveProperty('membershipReady',false));
 it.each([null,{}, {authenticated:'true'},{authenticated:true,subject:'x'}])('rejects malformed payload %j',(value)=>expect(()=>parseSession(value)).toThrow());
 it('returns understandable session expiry and never treats 401 as data',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue(new Response('{}',{status:401})));await expect(getJson('/api/v1/session')).rejects.toBeInstanceOf(ApiError);});
 it('preserves abort and same-origin credentials',async()=>{const f=vi.fn().mockResolvedValue(new Response('{"ok":true}'));vi.stubGlobal('fetch',f);const c=new AbortController();await getJson('/api/v1/session',c.signal);expect(f).toHaveBeenCalledWith('/api/v1/session',expect.objectContaining({credentials:'same-origin',signal:c.signal}));});
});
