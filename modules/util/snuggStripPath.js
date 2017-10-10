
// Strips a path to the actual route, determining what data API we're fetching against.
export default function snuggStripPath(pathname: string) {
  let sliceLength = Infinity, [...segments] = pathname.split('/').filter(x => x);
  let [one, two] = segments;
  if (one === 'job') {
    sliceLength = 2
  } else if (one === 'joblist') {
    sliceLength = 4
  } else if (one === 'settings' && two === 'company') {
    sliceLength = 3
  } else {
    sliceLength = 0
  }
  return segments.slice(0, sliceLength).join('/');
}
