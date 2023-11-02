import { write, append } from './Firebase'

export function Test()
{
    write('testvalue/', {some:'not-a-data'});
    append('testarr/', ['m1', 'm2', 'm3']);
    return 42;
}