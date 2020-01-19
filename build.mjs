#!/usr/bin/env -S node --experimental-modules

import fs from 'fs-extra';
import format from 'sprintf-js';
import assert from 'assert';








main();

async function main(){

//  '2077      Mar 19  23:30     Jun 20  16:23     Sep 22  08:35     Dec 21  06:00',

  //'Year      spring    summer     fall      winter ',
  let mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let re = /^(\d{4})\s+([A-Z][a-z]{2})\s+(\d+)\s+(\d+):(\d+)\s+([A-Z][a-z]{2})\s+(\d+)\s+(\d+):(\d+)\s+([A-Z][a-z]{2})\s+(\d+)\s+(\d+):(\d+)\s+([A-Z][a-z]{2})\s+(\d+)\s+(\d+):(\d+)$/;

  const lines = (await fs.readFile('source.txt'))
  .toString()
  .split('\n')
  .map(i=>i.trim())
  .map(i=>i.replace(/\s+/g,' '))
  .filter(i=>i.match(/^\d{4}\s/))
  .map(i=>{


    const m = re.exec(i);

    const [,year, springMonth, springDay, springHour, springMinute, summerMonth, summerDay, summerHour, summerMinute, fallMonth, fallDay, fallHour, fallMinute, winterMonth, winterDay, winterHour, winterMinute]=m;

    const o = {year, springMonth, springDay, springHour, springMinute, summerMonth, summerDay, summerHour, summerMinute, fallMonth, fallDay, fallHour, fallMinute, winterMonth, winterDay, winterHour, winterMinute};

    const response = {
      year:parseInt(year),
      spring: new Date(),
      summer: new Date(),
      fall: new Date(),
      winter: new Date(),
    };

    response.spring.setUTCFullYear(o.year) // An integer specifying the numeric value of the year, for example, 1995.
    response.spring.setUTCMonth(mon.indexOf(o.springMonth)) // An integer between 0 and 11, representing the months January through December.
    response.spring.setUTCDate(o.springDay) // An integer from 1 to 31, representing the day of the month.
    response.spring.setUTCHours(o.springHour) // An integer between 0 and 23, representing the hour.
    response.spring.setUTCMinutes(o.springMinute) // An integer between 0 and 59, representing the minutes.
    response.spring.setUTCSeconds(0) // An integer between 0 and 59, representing the seconds.
    response.spring.setUTCMilliseconds(0) // A number between 0 and 999, representing the milliseconds.

    response.summer.setUTCFullYear(o.year) // An integer specifying the numeric value of the year, for example, 1995.
    response.summer.setUTCMonth(mon.indexOf(o.summerMonth)) // An integer between 0 and 11, representing the months January through December.
    response.summer.setUTCDate(o.summerDay) // An integer from 1 to 31, representing the day of the month.
    response.summer.setUTCHours(o.summerHour) // An integer between 0 and 23, representing the hour.
    response.summer.setUTCMinutes(o.summerMinute) // An integer between 0 and 59, representing the minutes.
    response.summer.setUTCSeconds(0) // An integer between 0 and 59, representing the seconds.
    response.summer.setUTCMilliseconds(0) // A number between 0 and 999, representing the milliseconds.

    response.fall.setUTCFullYear(o.year) // An integer specifying the numeric value of the year, for example, 1995.
    response.fall.setUTCMonth(mon.indexOf(o.fallMonth)) // An integer between 0 and 11, representing the months January through December.
    response.fall.setUTCDate(o.fallDay) // An integer from 1 to 31, representing the day of the month.
    response.fall.setUTCHours(o.fallHour) // An integer between 0 and 23, representing the hour.
    response.fall.setUTCMinutes(o.fallMinute) // An integer between 0 and 59, representing the minutes.
    response.fall.setUTCSeconds(0) // An integer between 0 and 59, representing the seconds.
    response.fall.setUTCMilliseconds(0) // A number between 0 and 999, representing the milliseconds.

    response.winter.setUTCFullYear(o.year) // An integer specifying the numeric value of the year, for example, 1995.
    response.winter.setUTCMonth(mon.indexOf(o.winterMonth)) // An integer between 0 and 11, representing the months January through December.
    response.winter.setUTCDate(o.winterDay) // An integer from 1 to 31, representing the day of the month.
    response.winter.setUTCHours(o.winterHour) // An integer between 0 and 23, representing the hour.
    response.winter.setUTCMinutes(o.winterMinute) // An integer between 0 and 59, representing the minutes.
    response.winter.setUTCSeconds(0) // An integer between 0 and 59, representing the seconds.
    response.winter.setUTCMilliseconds(0) // A number between 0 and 999, representing the milliseconds.

    const testLine = [

      response.spring.getUTCFullYear(),

      mon[response.spring.getUTCMonth()],
      response.spring.getUTCDate(),
      format.sprintf('%02d', response.spring.getUTCHours()) +':'+ format.sprintf('%02d', response.spring.getUTCMinutes()),
      mon[response.summer.getUTCMonth()],
      response.summer.getUTCDate(),
      format.sprintf('%02d', response.summer.getUTCHours()) +':'+ format.sprintf('%02d', response.summer.getUTCMinutes()),
      mon[response.fall.getUTCMonth()],
      response.fall.getUTCDate(),
      format.sprintf('%02d', response.fall.getUTCHours()) +':'+ format.sprintf('%02d', response.fall.getUTCMinutes()),
      mon[response.winter.getUTCMonth()],
      response.winter.getUTCDate(),
      format.sprintf('%02d', response.winter.getUTCHours()) +':'+ format.sprintf('%02d', response.winter.getUTCMinutes()),
    ].join(' ');

    assert.strictEqual(i, testLine);

    return response;
  })

  await fs.outputJson('flat.json', lines, {spaces: '  '})

  console.log(lines);
}
