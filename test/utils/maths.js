import test from 'ava';
import {toFixed, format, clamp, toPrecision} from 'utils/maths';

test('toFixed', t => {
  const decimal1a = toFixed(0.89, 1);
  const decimal1b = toFixed(0.80, 1);
  const decimal2a = toFixed(0.891, 2);
  const decimal2b = toFixed(0.899, 2);
  const pi = toFixed(Math.PI, 3);

  t.is(decimal1a, '0.9');
  t.is(decimal1b, '0.8');
  t.is(decimal2a, '0.89');
  t.is(decimal2b, '0.90');
  t.is(pi, '3.142');
});

test('format', t => {
  const a = format(0.89, 0.1);
  const b = format(0.80, 0.01);
  const c = format(0.891, 0.2);
  const d = format(0.899, 1);
  const e = format(0.89, '0.1');

  t.is(a, '0.9');
  t.is(b, '0.80');
  t.is(c, '0.9');
  t.is(d, '1');
  t.is(e, '0.9');
});

test('clamp', t => {
  const a = clamp(0.8, 0, 1);
  const b = clamp(0.8, 0, 0.5);
  const c = clamp(-0.8, 0, 0.5);
  const d = clamp(-2, -1, 1);

  t.is(a, 0.8);
  t.is(b, 0.5);
  t.is(c, 0);
  t.is(d, -1);
});

test('toPrecision', t => {
  const a = toPrecision(1, 0.1);
  const b = toPrecision(1.1, 0.1);
  const c = toPrecision(1.1, 0.5);
  const d = toPrecision(2.89, 0.9);
  const e = toPrecision(2.889, 0.01);

  t.is(a, 1.0);
  t.is(b, 1.1);
  t.is(c, 1.0);
  t.is(d, 2.7);
  t.is(e, 2.89);
});
