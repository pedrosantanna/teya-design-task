import { ListGroup } from '../ListRow/ListRow';
import { ReliabilityRow } from './ReliabilityRow';

// An asked shop with enough yeses, then a connected shop that is new on Snuffle.
export function ReliabilityRowExamples() {
  return (
    <>
      <ListGroup shadow>
        <ReliabilityRow kind="answers" title="Answers 9 in 10 requests" detail="46 of 51 so far" accessibilityLabel="Answers 9 in 10 requests, 46 of 51 so far" position="first" />
        <ReliabilityRow kind="speed" title="Usually replies in 6 min" accessibilityLabel="Usually replies in 6 minutes" position="middle" />
        <ReliabilityRow kind="stock" title="Had it 24 of 25 times they said yes" accessibilityLabel="Had it 24 of 25 times they said yes" position="last" />
      </ListGroup>
      <ListGroup shadow>
        <ReliabilityRow kind="answers" title="Answers every request" detail="34 of 34 so far" accessibilityLabel="Answers every request, 34 so far" position="first" />
        <ReliabilityRow kind="till" title="Stock from the till" detail="Answers at once, from what the till shows" accessibilityLabel="Stock from the till, answers at once" position="middle" />
        <ReliabilityRow
          kind="new"
          title="New on Snuffle"
          detail="How often they had it shows after 10 yeses"
          accessibilityLabel="New on Snuffle. How often they had it shows after 10 yeses"
          position="last"
        />
      </ListGroup>
    </>
  );
}
