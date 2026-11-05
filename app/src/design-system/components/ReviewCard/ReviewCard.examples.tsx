import { ListGroup } from '../ListRow/ListRow';
import { ReviewCard } from './ReviewCard';

// One person who would go back and one who wouldn't, as rows of one grouped list, as on the shop page; the first is clamped to three lines.
export function ReviewCardExamples() {
  return (
    <ListGroup shadow>
      <ReviewCard position="first" up name="Priya" text="Loaf was waiting with my name on it. Still warm at 6." month="Oct 2026" lines={3} />
      <ReviewCard position="last" up={false} name="Callum" text="Delivery came an hour after the time they gave." month="Oct 2026" lines={3} />
    </ListGroup>
  );
}
