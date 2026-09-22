import {test,expect,Page} from '@playwright/test'


const BaseUser='https://eventhub.rahulshettyacademy.com'
const emailid='thimmareddy452@gmail.com';
const password='Srinu452@';
async function login(page:Page){
    
    await page.goto(`${BaseUser}/login`)

    await page.getByPlaceholder("you@email.com").fill(emailid)
    await page.getByLabel("Password").fill(password)
    page.locator("#login-btn").click()

    await expect(page.getByRole("link",{name:"Browse Events →"})).toBeVisible();
}

test("fill Assignment flow",async({page})=>{
    // step 1: Login is Done
    await login(page);

    // step 2: create a new  event

    await page.goto(`${BaseUser}/admin/events`);
    const titlename=`Test Event ${Date.now()} `

    await page.locator(" #event-title-input").fill(titlename);
    await page.locator("#admin-event-form textarea").fill(" This new event is by Ashokreddy");
    await page.getByLabel("City").fill("Hyderabad");
    await page.getByLabel("Venue").fill("Gudimalkpuram");
    await page.getByLabel("Event Date & Time").fill("2026-09-30T10:00")
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("200");
    await page.locator("#add-event-btn").click();

    await expect(page.getByText("Event created!")).toBeVisible();
    console.log(titlename)


    // step 3:Go to Events page and find the newly created card 

    await page.goto(`${BaseUser}/events`);

    const eventcards=page.getByTestId("event-card");
    await expect(eventcards.last()).toBeVisible();
    
    const targetCard=eventcards.filter({hasText:titlename}).first();
    await expect(targetCard).toBeVisible({timeout:5000})
    const seatBeforeBooking=parseInt(await targetCard.getByText("Seat").first().innerText());

    console.log(seatBeforeBooking)

    await targetCard.getByTestId("book-now-btn").click();
      // ── Step 4: Fill the booking form ──

    const ticketcount=page.locator("#ticket-count")  
    await expect(ticketcount).toHaveText("1");
    await page.getByLabel("Full NaMe").fill("Ashok Reddy");
    await page.locator("#customer-email").fill("ashok.reddy@gmail.com")
    await page.getByPlaceholder("+91 98765 43210").fill("9989878685")
    await page.locator("#confirm-booking").click();
    // step 5 :Verify booking confirmation
    const BookingREFe1=page.locator(".booking-ref").first();
    await expect(BookingREFe1).toBeVisible();
    console.log((await BookingREFe1.innerText()).trim());

    const BookingRef=(await BookingREFe1.innerText()).trim();
    expect(BookingRef.charAt(0)).toBe(titlename.trim().charAt(0).toUpperCase());

    await page.getByRole("link",{name:"View My Bookings"}).click();

    await expect(page).toHaveURL(`${BaseUser}/bookings`);

    const bookingCards=page.locator("#booking-card");
    await expect(bookingCards.first()).toBeVisible();

    const matchingcard=bookingCards.filter({has:page.locator('.booking-ref',{hasText:BookingRef})})
    await expect(matchingcard).toBeVisible();

    await expect(matchingcard).toContainText(titlename)
    console.log(`Booking card found in My Bookings for ref: ${BookingRef}`);

    await page.goto(`${BaseUser}/events`);
    await expect(eventcards.last()).toBeVisible();
    const card=eventcards.filter({hasText:titlename}).first();

    await expect(card).toBeVisible();
    const seatsAfterBooking=parseInt(await card.getByText("Seat").first().innerText());
    // Booked 1 ticket — count must drop by exactly 1
    expect(seatsAfterBooking).toBe(seatBeforeBooking - 1);

    console.log(seatBeforeBooking-1)

})