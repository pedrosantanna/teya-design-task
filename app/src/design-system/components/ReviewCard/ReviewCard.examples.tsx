import { ListGroup } from '../ListRow/ListRow';
import { ReviewCard } from './ReviewCard';

// One buyer who would go back and one who wouldn't, as rows of one grouped list, as on the shop page.
export function ReviewCardExamples() {
  return (
    <ListGroup shadow>
      <ReviewCard position="first" up text="Loaf was waiting with my name on it. Still warm at 6." month="Oct 2026" how="Collected" />
      <ReviewCard position="last" up={false} text="Delivery came an hour after the time they gave." month="Oct 2026" how="Delivered" />
    </ListGroup>
  );
}
