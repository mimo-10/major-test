/** @format */

import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
	scenarios: {
		test_50_connections: {
			executor: "constant-arrival-rate",
			rate: 100, // requests per second (20,000 RPS * 50 = 1M over 50 seconds)
			duration: "50s", // Run for 50 seconds
			preAllocatedVUs: 500, // Number of Virtual Users
			maxVUs: 500, // Max Virtual Users
		},
		test_100_connections: {
			startTime: "1m", // Start after the first test
			executor: "constant-arrival-rate",
			rate: 100, // requests per second (10,000 RPS * 100 = 1M over 100 seconds)
			duration: "100s", // Run for 100 seconds
			preAllocatedVUs: 500, // Number of Virtual Users
			maxVUs: 500, // Max Virtual Users
		},
		test_300_connections: {
			startTime: "150s", // Start after the second test
			executor: "constant-arrival-rate",
			rate: 100, // requests per second (3,333 RPS * 300 = 1M over 300 seconds)
			duration: "60s", // Run for 300 seconds
			preAllocatedVUs: 500, // Number of Virtual Users
			maxVUs: 500, // Max Virtual Users
		},
	},
};
// export let options = {
// 	stages: [
// 		// Smoke Test (1 user for 5s)
// 		{ duration: "5s", target: 1000 },
// 		// Load Test (Ramp up to 10 users over 30s)
// 		{ duration: "30s", target: 1200 },
// 		// Stress Test (Ramp up to 100 users over 1m)
// 		{ duration: "1m", target: 1200 },
// 		// Spike Test (Sudden burst to 200 users)
// 		{ duration: "10s", target: 2000 },
// 		// Recover phase after spike
// 		{ duration: "20s", target: 0 },
// 	],
// };

export default function () {
	const token =
		"eyJhbGciOiJIUzI1NiJ9.NjZlNThjMDAwNTlhODljMDUxZDRmYWQ3.4fDwyrm5yuzJvc9589LAadhgRw9dYu6SVxtsJ4Sh7ZM";
	const classId = "";
	const teacherId = "66e49740059a89c051d4dccf";
	const url = `http://34.1.0.255:4000/api/classroom/student`;
	// const url = `http://127.0.0.1:4000/api/classroom/student`;
	// const url = `http://34.1.0.255:4000/api/teacher/${teacherId}`;

	const params = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json ",
		},
	};
	// const payload = JSON.stringify({ data: "test data" });

	let res = http.get(url, params);
	check(res, {
		"is status 200": (r) => r.status === 200,
		"is response not empty": (r) => r.body !== "",
	});

	sleep(1); // Simulate real-user pause
}
