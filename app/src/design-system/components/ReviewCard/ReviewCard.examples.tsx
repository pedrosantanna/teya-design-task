import { ListGroup } from '../ListRow/ListRow';
import { ReviewCard, ReviewCarousel } from './ReviewCard';

// One person who would go back and one who wouldn't, as rows of one grouped list, as on the shop page; the first is clamped to three lines.
export function ReviewCardExamples() {
  return (
    <ListGroup shadow>
      <ReviewCard position="first" up name="Priya" text="Loaf was waiting with my name on it. Still warm at 6." month="Oct 2026" lines={3} />
      <ReviewCard position="last" up={false} name="Callum" text="Delivery came an hour after the time they gave." month="Oct 2026" lines={3} />
    </ListGroup>
  );
}

// The shop page's carousel: cards at 80% of the content width, equal height, the next one peeking in.
export function ReviewCarouselExamples() {
  return (
    <ReviewCarousel accessibilityLabel="Reviews, 2 of 38" bleed={0} count={2}>
      {(width) => (
        <>
          <ReviewCard width={width} up name="Priya" text="Loaf was waiting with my name on it. Still warm at 6." month="Oct 2026" lines={5} />
          <ReviewCard width={width} up={false} name="Callum" text="Delivery came an hour after the time they gave." month="Oct 2026" lines={5} />
        </>
      )}
    </ReviewCarousel>
  );
}
