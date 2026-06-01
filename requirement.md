dựa vào api của backend: /Users/nguyenkhanh/Documents/GitHub/manson-admin-api

curl 'https://localhost:8001/api/products?page=4&limit=10' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzgwMDM2NDQ5fQ.m7yAFW5HgBIzjf1dqTAlMkwDdyZvsjaHDnBuscne1bvHTi_G8XsuoQXME8N1CPkCUGml9-iRu6xdyWUszs2zIKIgktntVrszLy3e24GLLpDsKjwqaK_n6Pa-Y648PgMJWUuTnb-AOlyK3JW59m9sl9Yd9fCjaV3jFPs09wslFURMIplNGGgV_0EcxgWffhSTfqbAeUUF5msKc8U1YL5JqvEBGAEv8jt_hVZCfVuuvB7N_luxZHN5a8lZBJ2wYqkxY4ISsgTVuLOGxIr5kLZyTq1-noGKhBQ3LoWZ5lleM2dXAIxRs7KbrtKOPGVc0Tti03CIv5ub60Ajb-lgyaQKJRV1B1vpfcYp9AWC5lfn9TkMfbAt8-ajfwuIDBDuIRd1GSuJdOoERd_gefys0_pEv8ilxAnsNL4lcUQhWmNsx2gA3IQrGV7rJ4OGeGBJQL6P7qU2Ajqvff6Ui5bQs0FT3HSHXWRwwuW0373qkQy0Iy5Kp102amtUHQaJ2i9M5XxX01Z97Y9R5waH05ATps6E1w8fvLrbUv3OF01-dxA0RE4N74mYZwJzBQUZbPRVFPdKE-6kgMB_I23ZAsMSsVsUtcvJE7OOg3RmKm0xMXhwoitu94vGQvTQ3jTpN3LfrjyTi9KOVNGF0OKH783O3lzJdsP9ofM_bm2S7DO0xNTpfd0' \
  -H 'Referer: https://localhost:8000/' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'sec-ch-ua: "Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0'

payload:
{
    "data": [
        {
            "id": 32,
            "createdOn": "2025-07-04T10:09:46.732Z",
            "modifiedOn": "2025-07-04T10:09:46.732Z",
            "name": "Manson Iris",
            "externalId": "46090584",
            "alias": "manson-iris",
            "vendor": "Manson",
            "description": "",
            "templateLayout": null,
            "images": [
                {
                    "id": 103,
                    "createdOn": "2025-07-04T10:09:46.715Z",
                    "modifiedOn": "2025-07-04T10:09:46.715Z",
                    "url": "/uploads/medium-ghe-cong-thai-hoc-manson-iris-wintex-den-e0011b3435.webp",
                    "alt": "image",
                    "filename": "medium-ghe-cong-thai-hoc-manson-iris-wintex-den-e0011b3435.webp",
                    "size": 34400,
                    "width": null,
                    "height": null,
                    "externalId": "97578289",
                    "formats": {},
                    "position": 5,
                    "fileId": 600102,
                    "variantIds": [
                        111,
                        114,
                        117
                    ]
                },
                {
                    "id": 100,
                    "createdOn": "2025-07-04T10:09:46.558Z",
                    "modifiedOn": "2025-07-04T10:09:46.558Z",
                    "url": "/uploads/medium-ghe-cong-thai-hoc-manson-iris-matrex-den-404844eb7b.webp",
                    "alt": "image",
                    "filename": "medium-ghe-cong-thai-hoc-manson-iris-matrex-den-404844eb7b.webp",
                    "size": 37456,
                    "width": null,
                    "height": null,
                    "externalId": "97578215",
                    "formats": {},
                    "position": 2,
                    "fileId": 600098,
                    "variantIds": [
                        109
                    ]
                },
                {
                    "id": 99,
                    "createdOn": "2025-07-04T10:09:46.654Z",
                    "modifiedOn": "2025-07-04T10:09:46.654Z",
                    "url": "/uploads/medium-ghe-cong-thai-hoc-manson-iris-matrex-xam-2e2a8c7c48.webp",
                    "alt": "image",
                    "filename": "medium-ghe-cong-thai-hoc-manson-iris-matrex-xam-2e2a8c7c48.webp",
                    "size": 53244,
                    "width": null,
                    "height": null,
                    "externalId": "97578238",
                    "formats": {},
                    "position": 1,
                    "fileId": 600099,
                    "variantIds": [
                        110
                    ]
                },
                {
                    "id": 101,
                    "createdOn": "2025-07-04T10:09:46.660Z",
                    "modifiedOn": "2025-07-04T10:09:46.660Z",
                    "url": "/uploads/medium-ghe-van-phong-cong-thai-hoc-manson-iris-lung-xam-luoi-xam-1022632ef5-068fe8ab81.webp",
                    "alt": "image",
                    "filename": "medium-ghe-van-phong-cong-thai-hoc-manson-iris-lung-xam-luoi-xam-1022632ef5-068fe8ab81.webp",
                    "size": 36804,
                    "width": null,
                    "height": null,
                    "externalId": "97578344",
                    "formats": {},
                    "position": 3,
                    "fileId": 600100,
                    "variantIds": [
                        116,
                        113,
                        119
                    ]
                },
                {
                    "id": 102,
                    "createdOn": "2025-07-04T10:09:46.688Z",
                    "modifiedOn": "2025-07-04T10:09:46.688Z",
                    "url": "/uploads/medium-ghe-cong-thai-hoc-manson-iris-wintex-xam-f5d24125da.webp",
                    "alt": "image",
                    "filename": "medium-ghe-cong-thai-hoc-manson-iris-wintex-xam-f5d24125da.webp",
                    "size": 27944,
                    "width": null,
                    "height": null,
                    "externalId": "97578334",
                    "formats": {},
                    "position": 4,
                    "fileId": 600101,
                    "variantIds": [
                        118,
                        112,
                        115
                    ]
                }
            ],
            "tags": []
        },
        {
            "id": 34,
            "createdOn": "2025-07-04T10:09:47.623Z",
            "modifiedOn": "2025-07-20T03:51:09.929Z",
            "name": "Manson Vera",
            "externalId": "46056924",
            "alias": "manson-vera",
            "vendor": "Manson",
            "description": "<p>Manson Vera</p>",
            "templateLayout": null,
            "images": [
                {
                    "id": 609,
                    "createdOn": "2025-07-04T10:09:47.429Z",
                    "modifiedOn": "2025-07-04T10:09:47.429Z",
                    "url": "/uploads/c6077df0-015b-4dc7-b006-356c401e134e.jpg",
                    "alt": "image",
                    "filename": "c6077df0-015b-4dc7-b006-356c401e134e.jpg",
                    "size": 122318,
                    "width": null,
                    "height": null,
                    "externalId": "97563655",
                    "formats": {},
                    "position": 1,
                    "fileId": 600105,
                    "variantIds": [
                        793,
                        798
                    ]
                },
                {
                    "id": 611,
                    "createdOn": "2025-07-04T10:09:47.478Z",
                    "modifiedOn": "2025-07-04T10:09:47.478Z",
                    "url": "/uploads/wintex-xam-1675305082270.jpg",
                    "alt": "image",
                    "filename": "wintex-xam-1675305082270.jpg",
                    "size": 154878,
                    "width": null,
                    "height": null,
                    "externalId": "97563607",
                    "formats": {},
                    "position": 3,
                    "fileId": 600107,
                    "variantIds": [
                        792
                    ]
                },
                {
                    "id": 612,
                    "createdOn": "2025-07-04T10:09:47.497Z",
                    "modifiedOn": "2025-07-04T10:09:47.497Z",
                    "url": "/uploads/4d86dd60-3c3d-40f2-898d-5685998e8698.jpg",
                    "alt": "image",
                    "filename": "4d86dd60-3c3d-40f2-898d-5685998e8698.jpg",
                    "size": 118956,
                    "width": null,
                    "height": null,
                    "externalId": "97563560",
                    "formats": {},
                    "position": 4,
                    "fileId": 600108,
                    "variantIds": [
                        795,
                        791
                    ]
                },
                {
                    "id": 614,
                    "createdOn": "2025-07-04T10:09:47.280Z",
                    "modifiedOn": "2025-07-04T10:09:47.280Z",
                    "url": "/uploads/0d805963-3ca4-4c3a-b423-98a0a1a435ce.jpg",
                    "alt": "image",
                    "filename": "0d805963-3ca4-4c3a-b423-98a0a1a435ce.jpg",
                    "size": 65521,
                    "width": null,
                    "height": null,
                    "externalId": "97563455",
                    "formats": {},
                    "position": 6,
                    "fileId": 600104,
                    "variantIds": [
                        789
                    ]
                },
                {
                    "id": 613,
                    "createdOn": "2025-07-04T10:09:47.599Z",
                    "modifiedOn": "2025-07-04T10:09:47.599Z",
                    "url": "/uploads/9ab9f15c-1d02-425e-a70d-0ddcd419c057.jpg",
                    "alt": "image",
                    "filename": "9ab9f15c-1d02-425e-a70d-0ddcd419c057.jpg",
                    "size": 118481,
                    "width": null,
                    "height": null,
                    "externalId": "97563703",
                    "formats": {},
                    "position": 5,
                    "fileId": 600109,
                    "variantIds": [
                        794,
                        797
                    ]
                },
                {
                    "id": 610,
                    "createdOn": "2025-07-04T10:09:47.445Z",
                    "modifiedOn": "2025-07-04T10:09:47.445Z",
                    "url": "/uploads/76dd8398-24fe-48c5-8755-e63017307618.jpg",
                    "alt": "image",
                    "filename": "76dd8398-24fe-48c5-8755-e63017307618.jpg",
                    "size": 115630,
                    "width": null,
                    "height": null,
                    "externalId": "97563496",
                    "formats": {},
                    "position": 2,
                    "fileId": 600106,
                    "variantIds": [
                        790,
                        796
                    ]
                }
            ],
            "tags": []
        },
        {
            "id": 35,
            "createdOn": "2025-07-04T10:09:48.045Z",
            "modifiedOn": "2025-07-04T10:09:48.045Z",
            "name": "Xiaomi Manson Butterfly Wing",
            "externalId": "46056032",
            "alias": "xiaomi-manson-butterfly-wing",
            "vendor": "Manson",
            "description": "",
            "templateLayout": null,
            "images": [
                {
                    "id": 111,
                    "createdOn": "2025-07-04T10:09:47.911Z",
                    "modifiedOn": "2025-07-04T10:09:47.911Z",
                    "url": "/uploads/ad9137ba-e319-4b20-b7cd-e2d09e57cb65.jpg",
                    "alt": "image",
                    "filename": "ad9137ba-e319-4b20-b7cd-e2d09e57cb65.jpg",
                    "size": 52544,
                    "width": null,
                    "height": null,
                    "externalId": "97562456",
                    "formats": {},
                    "position": 1,
                    "fileId": 600110,
                    "variantIds": [
                        130
                    ]
                },
                {
                    "id": 112,
                    "createdOn": "2025-07-04T10:09:48.018Z",
                    "modifiedOn": "2025-07-04T10:09:48.018Z",
                    "url": "/uploads/154abaa8-e7f1-4fcd-9aed-c300a8b1644e.jpg",
                    "alt": "image",
                    "filename": "154abaa8-e7f1-4fcd-9aed-c300a8b1644e.jpg",
                    "size": 51099,
                    "width": null,
                    "height": null,
                    "externalId": "97562484",
                    "formats": {},
                    "position": 2,
                    "fileId": 600111,
                    "variantIds": [
                        129
                    ]
                }
            ],
            "tags": []
        },
        {
            "id": 36,
            "createdOn": "2025-07-04T10:09:48.540Z",
            "modifiedOn": "2025-07-04T10:09:48.540Z",
            "name": "Xiaomi Manson Regal",
            "externalId": "46051844",
            "alias": "xiaomi-manson-ergonomic-1",
            "vendor": "Manson",
            "description": "",
            "templateLayout": null,
            "images": [
                {
                    "id": 115,
                    "createdOn": "2025-07-04T10:09:48.510Z",
                    "modifiedOn": "2025-07-04T10:09:48.510Z",
                    "url": "/uploads/34d18f52-03b4-4177-854d-9ed3b86d6549.jpg",
                    "alt": "image",
                    "filename": "34d18f52-03b4-4177-854d-9ed3b86d6549.jpg",
                    "size": 174922,
                    "width": null,
                    "height": null,
                    "externalId": "97558689",
                    "formats": {},
                    "position": 3,
                    "fileId": 600115,
                    "variantIds": [
                        131
                    ]
                },
                {
                    "id": 113,
                    "createdOn": "2025-07-04T10:09:48.451Z",
                    "modifiedOn": "2025-07-04T10:09:48.451Z",
                    "url": "/uploads/70ed8f9d-bf44-4a8d-926d-6de1f6466a50.jpg",
                    "alt": "image",
                    "filename": "70ed8f9d-bf44-4a8d-926d-6de1f6466a50.jpg",
                    "size": 41324,
                    "width": null,
                    "height": null,
                    "externalId": "97558553",
                    "formats": {},
                    "position": 1,
                    "fileId": 600113,
                    "variantIds": [
                        135
                    ]
                },
                {
                    "id": 117,
                    "createdOn": "2025-07-04T10:09:48.518Z",
                    "modifiedOn": "2025-07-04T10:09:48.518Z",
                    "url": "/uploads/fc7d2e72-447e-482d-84fa-99215b628655.jpg",
                    "alt": "image",
                    "filename": "fc7d2e72-447e-482d-84fa-99215b628655.jpg",
                    "size": 117003,
                    "width": null,
                    "height": null,
                    "externalId": "97558483",
                    "formats": {},
                    "position": 5,
                    "fileId": 600116,
                    "variantIds": [
                        134
                    ]
                },
                {
                    "id": 114,
                    "createdOn": "2025-07-04T10:09:48.502Z",
                    "modifiedOn": "2025-07-04T10:09:48.502Z",
                    "url": "/uploads/bc2eeffa-64c0-40d4-8a6d-8cf0db57a824.jpg",
                    "alt": "image",
                    "filename": "bc2eeffa-64c0-40d4-8a6d-8cf0db57a824.jpg",
                    "size": 125002,
                    "width": null,
                    "height": null,
                    "externalId": "97558837",
                    "formats": {},
                    "position": 2,
                    "fileId": 600114,
                    "variantIds": [
                        133
                    ]
                },
                {
                    "id": 116,
                    "createdOn": "2025-07-04T10:09:48.350Z",
                    "modifiedOn": "2025-07-04T10:09:48.350Z",
                    "url": "/uploads/f2cd5d5b-1454-4728-8ceb-19abb789d10c.jpg",
                    "alt": "image",
                    "filename": "f2cd5d5b-1454-4728-8ceb-19abb789d10c.jpg",
                    "size": 151129,
                    "width": null,
                    "height": null,
                    "externalId": "97558389",
                    "formats": {},
                    "position": 4,
                    "fileId": 600112,
                    "variantIds": [
                        132
                    ]
                }
            ],
            "tags": []
        },
        {
            "id": 37,
            "createdOn": "2025-07-04T10:09:49.090Z",
            "modifiedOn": "2025-07-04T10:09:49.090Z",
            "name": "Xiaomi Manson Ergonomic",
            "externalId": "46048074",
            "alias": "xiaomi-manson-ergonomic",
            "vendor": "Manson",
            "description": "",
            "templateLayout": null,
            "images": [
                {
                    "id": 119,
                    "createdOn": "2025-07-04T10:09:49.072Z",
                    "modifiedOn": "2025-07-04T10:09:49.072Z",
                    "url": "/uploads/3b42fe9d-81a4-4d9b-ab6e-ef8b34c7549f.jpg",
                    "alt": "image",
                    "filename": "3b42fe9d-81a4-4d9b-ab6e-ef8b34c7549f.jpg",
                    "size": 339444,
                    "width": null,
                    "height": null,
                    "externalId": "97557441",
                    "formats": {},
                    "position": 2,
                    "fileId": 600119,
                    "variantIds": [
                        136
                    ]
                },
                {
                    "id": 118,
                    "createdOn": "2025-07-04T10:09:49.037Z",
                    "modifiedOn": "2025-07-04T10:09:49.037Z",
                    "url": "/uploads/9ba387ab-11e4-4270-ac96-666e444a7c4d.jpg",
                    "alt": "image",
                    "filename": "9ba387ab-11e4-4270-ac96-666e444a7c4d.jpg",
                    "size": 198717,
                    "width": null,
                    "height": null,
                    "externalId": "97557585",
                    "formats": {},
                    "position": 1,
                    "fileId": 600118,
                    "variantIds": [
                        138
                    ]
                },
                {
                    "id": 120,
                    "createdOn": "2025-07-04T10:09:48.849Z",
                    "modifiedOn": "2025-07-04T10:09:48.849Z",
                    "url": "/uploads/328af7ed-4334-4c5d-8bc2-eb4f78c97892.jpg",
                    "alt": "image",
                    "filename": "328af7ed-4334-4c5d-8bc2-eb4f78c97892.jpg",
                    "size": 137852,
                    "width": null,
                    "height": null,
                    "externalId": "97557353",
                    "formats": {},
                    "position": 3,
                    "fileId": 600117,
                    "variantIds": [
                        137
                    ]
                }
            ],
            "tags": []
        },
        {
            "id": 38,
            "createdOn": "2025-07-04T10:09:49.483Z",
            "modifiedOn": "2025-07-04T10:09:49.483Z",
            "name": "Xiaomi Manson Oasis",
            "externalId": "46044108",
            "alias": "xiaomi-manson-oasis",
            "vendor": "Manson",
            "description": "<p><br></p>",
            "templateLayout": null,
            "images": [
                {
                    "id": 121,
                    "createdOn": "2025-07-04T10:09:49.356Z",
                    "modifiedOn": "2025-07-04T10:09:49.356Z",
                    "url": "/uploads/1b282381-15d3-4daa-b4a1-b0c1053083c6.jpg",
                    "alt": "image",
                    "filename": "1b282381-15d3-4daa-b4a1-b0c1053083c6.jpg",
                    "size": 83456,
                    "width": null,
                    "height": null,
                    "externalId": "97557796",
                    "formats": {},
                    "position": 1,
                    "fileId": 600120,
                    "variantIds": [
                        140
                    ]
                },
                {
                    "id": 122,
                    "createdOn": "2025-07-04T10:09:49.454Z",
                    "modifiedOn": "2025-07-04T10:09:49.454Z",
                    "url": "/uploads/2dcb7377-6b84-4be0-95d6-55af3522f465.jpg",
                    "alt": "image",
                    "filename": "2dcb7377-6b84-4be0-95d6-55af3522f465.jpg",
                    "size": 87660,
                    "width": null,
                    "height": null,
                    "externalId": "97557811",
                    "formats": {},
                    "position": 2,
                    "fileId": 600121,
                    "variantIds": [
                        139
                    ]
                }
            ],
            "tags": [
                {
                    "id": 7,
                    "createdOn": "2025-07-04T10:09:49.483Z",
                    "modifiedOn": "2025-07-04T10:09:49.483Z",
                    "externalId": null,
                    "name": "Manson"
                }
            ]
        },
        {
            "id": 39,
            "createdOn": "2025-07-25T10:09:33.349Z",
            "modifiedOn": "2025-08-17T05:06:02.684Z",
            "name": "Combo Bàn Nâng Hạ Manson SmartDesk",
            "externalId": "54676291",
            "alias": "combo-ban-nang-ha-manson-smartdesk-tuy-chinh-thong-minh-bao-ve-suc-khoe-nang-cao-nang-suat-lam-viec",
            "vendor": "",
            "description": "<p></p>",
            "templateLayout": "variant",
            "images": [
                {
                    "id": 799,
                    "createdOn": "2025-08-17T05:06:13.815Z",
                    "modifiedOn": "2025-08-17T05:06:13.815Z",
                    "url": "/uploads/z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_9c16dfef25219e3109e29.jpg",
                    "alt": null,
                    "filename": "z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_9c16dfef25219e3109e29.jpg",
                    "size": 34761,
                    "width": 800,
                    "height": 800,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_5219e3109e29a6a85f782.jpg",
                            "hash": "large_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_219e3109e29a6a85f7827",
                            "mime": "image/jpeg",
                            "name": "large_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_5219e3109e29a6a85f782.jpg",
                            "size": 22555,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_fef25219e3109e29a6a85.jpg",
                            "hash": "small_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_ef25219e3109e29a6a85f",
                            "mime": "image/jpeg",
                            "name": "small_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_fef25219e3109e29a6a85.jpg",
                            "size": 8059,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_f25219e3109e29a6a85f7.jpg",
                            "hash": "medium_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_25219e3109e29a6a85f78",
                            "mime": "image/jpeg",
                            "name": "medium_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_f25219e3109e29a6a85f7.jpg",
                            "size": 15000,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_19e3109e29a6a85f7827d.jpg",
                            "hash": "xlarge_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_9e3109e29a6a85f7827db",
                            "mime": "image/jpeg",
                            "name": "xlarge_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_19e3109e29a6a85f7827d.jpg",
                            "size": 55708,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_c16dfef25219e3109e29a.jpg",
                            "hash": "xsmall_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_16dfef25219e3109e29a6",
                            "mime": "image/jpeg",
                            "name": "xsmall_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_c16dfef25219e3109e29a.jpg",
                            "size": 915,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_6dfef25219e3109e29a6a.jpg",
                            "hash": "thumbnail_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_dfef25219e3109e29a6a8",
                            "mime": "image/jpeg",
                            "name": "thumbnail_z6832387629852_fb3c5eaf36fc997a6e4ff2b93ba1694b_6dfef25219e3109e29a6a.jpg",
                            "size": 1908,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 1,
                    "fileId": 600157,
                    "variantIds": [
                        907,
                        905,
                        903
                    ]
                },
                {
                    "id": 4122,
                    "createdOn": "2026-01-09T04:35:57.740Z",
                    "modifiedOn": "2026-01-09T04:35:57.740Z",
                    "url": "/uploads/chandenoak_5dbda18fcfdaa33be7fec.jpg",
                    "alt": null,
                    "filename": "chandenoak_5dbda18fcfdaa33be7fec.jpg",
                    "size": 67978,
                    "width": 1024,
                    "height": 1024,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_chandenoak_fdaa33be7feca5c6c4e79.jpg",
                            "hash": "large_chandenoak_daa33be7feca5c6c4e79a",
                            "mime": "image/jpeg",
                            "name": "large_chandenoak_fdaa33be7feca5c6c4e79.jpg",
                            "size": 19212,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_chandenoak_18fcfdaa33be7feca5c6c.jpg",
                            "hash": "small_chandenoak_8fcfdaa33be7feca5c6c4",
                            "mime": "image/jpeg",
                            "name": "small_chandenoak_18fcfdaa33be7feca5c6c.jpg",
                            "size": 7551,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_chandenoak_fcfdaa33be7feca5c6c4e.jpg",
                            "hash": "medium_chandenoak_cfdaa33be7feca5c6c4e7",
                            "mime": "image/jpeg",
                            "name": "medium_chandenoak_fcfdaa33be7feca5c6c4e.jpg",
                            "size": 13119,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_chandenoak_aa33be7feca5c6c4e79aa.jpg",
                            "hash": "xlarge_chandenoak_a33be7feca5c6c4e79aaf",
                            "mime": "image/jpeg",
                            "name": "xlarge_chandenoak_aa33be7feca5c6c4e79aa.jpg",
                            "size": 47661,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_chandenoak_dbda18fcfdaa33be7feca.jpg",
                            "hash": "xsmall_chandenoak_bda18fcfdaa33be7feca5",
                            "mime": "image/jpeg",
                            "name": "xsmall_chandenoak_dbda18fcfdaa33be7feca.jpg",
                            "size": 880,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_chandenoak_da18fcfdaa33be7feca5c.jpg",
                            "hash": "thumbnail_chandenoak_a18fcfdaa33be7feca5c6",
                            "mime": "image/jpeg",
                            "name": "thumbnail_chandenoak_da18fcfdaa33be7feca5c.jpg",
                            "size": 1860,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 5,
                    "fileId": 600240,
                    "variantIds": [
                        1370,
                        1372,
                        1368
                    ]
                },
                {
                    "id": 4118,
                    "createdOn": "2026-01-09T04:24:05.515Z",
                    "modifiedOn": "2026-01-09T04:24:05.515Z",
                    "url": "/uploads/chandenmattrang_bdc0ca900280bd87a2245.jpg",
                    "alt": null,
                    "filename": "chandenmattrang_bdc0ca900280bd87a2245.jpg",
                    "size": 56966,
                    "width": 1024,
                    "height": 1024,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_chandenmattrang_280bd87a224591abe10f6.jpg",
                            "hash": "large_chandenmattrang_80bd87a224591abe10f62",
                            "mime": "image/jpeg",
                            "name": "large_chandenmattrang_280bd87a224591abe10f6.jpg",
                            "size": 15947,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_chandenmattrang_a900280bd87a224591abe.jpg",
                            "hash": "small_chandenmattrang_900280bd87a224591abe1",
                            "mime": "image/jpeg",
                            "name": "small_chandenmattrang_a900280bd87a224591abe.jpg",
                            "size": 6386,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_chandenmattrang_00280bd87a224591abe10.jpg",
                            "hash": "medium_chandenmattrang_0280bd87a224591abe10f",
                            "mime": "image/jpeg",
                            "name": "medium_chandenmattrang_00280bd87a224591abe10.jpg",
                            "size": 11050,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_chandenmattrang_0bd87a224591abe10f627.jpg",
                            "hash": "xlarge_chandenmattrang_bd87a224591abe10f6278",
                            "mime": "image/jpeg",
                            "name": "xlarge_chandenmattrang_0bd87a224591abe10f627.jpg",
                            "size": 39973,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_chandenmattrang_dc0ca900280bd87a22459.jpg",
                            "hash": "xsmall_chandenmattrang_c0ca900280bd87a224591",
                            "mime": "image/jpeg",
                            "name": "xsmall_chandenmattrang_dc0ca900280bd87a22459.jpg",
                            "size": 771,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_chandenmattrang_0ca900280bd87a224591a.jpg",
                            "hash": "thumbnail_chandenmattrang_ca900280bd87a224591ab",
                            "mime": "image/jpeg",
                            "name": "thumbnail_chandenmattrang_0ca900280bd87a224591a.jpg",
                            "size": 1586,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 1,
                    "fileId": 600236,
                    "variantIds": [
                        949,
                        950,
                        947
                    ]
                },
                {
                    "id": 800,
                    "createdOn": "2025-08-17T05:06:18.833Z",
                    "modifiedOn": "2025-08-17T05:06:18.833Z",
                    "url": "/uploads/z6832387799909_64a6372aa053633629de4c18f899737d_e3109e29a6a85f7827dbe.jpg",
                    "alt": null,
                    "filename": "z6832387799909_64a6372aa053633629de4c18f899737d_e3109e29a6a85f7827dbe.jpg",
                    "size": 31712,
                    "width": 800,
                    "height": 800,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_z6832387799909_64a6372aa053633629de4c18f899737d_6a85f7827dbee3fbe6b7f.jpg",
                            "hash": "large_z6832387799909_64a6372aa053633629de4c18f899737d_a85f7827dbee3fbe6b7fd",
                            "mime": "image/jpeg",
                            "name": "large_z6832387799909_64a6372aa053633629de4c18f899737d_6a85f7827dbee3fbe6b7f.jpg",
                            "size": 19272,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_z6832387799909_64a6372aa053633629de4c18f899737d_e29a6a85f7827dbee3fbe.jpg",
                            "hash": "small_z6832387799909_64a6372aa053633629de4c18f899737d_29a6a85f7827dbee3fbe6",
                            "mime": "image/jpeg",
                            "name": "small_z6832387799909_64a6372aa053633629de4c18f899737d_e29a6a85f7827dbee3fbe.jpg",
                            "size": 6971,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_z6832387799909_64a6372aa053633629de4c18f899737d_9a6a85f7827dbee3fbe6b.jpg",
                            "hash": "medium_z6832387799909_64a6372aa053633629de4c18f899737d_a6a85f7827dbee3fbe6b7",
                            "mime": "image/jpeg",
                            "name": "medium_z6832387799909_64a6372aa053633629de4c18f899737d_9a6a85f7827dbee3fbe6b.jpg",
                            "size": 12631,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_z6832387799909_64a6372aa053633629de4c18f899737d_85f7827dbee3fbe6b7fd1.jpg",
                            "hash": "xlarge_z6832387799909_64a6372aa053633629de4c18f899737d_5f7827dbee3fbe6b7fd18",
                            "mime": "image/jpeg",
                            "name": "xlarge_z6832387799909_64a6372aa053633629de4c18f899737d_85f7827dbee3fbe6b7fd1.jpg",
                            "size": 48731,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_z6832387799909_64a6372aa053633629de4c18f899737d_3109e29a6a85f7827dbee.jpg",
                            "hash": "xsmall_z6832387799909_64a6372aa053633629de4c18f899737d_109e29a6a85f7827dbee3",
                            "mime": "image/jpeg",
                            "name": "xsmall_z6832387799909_64a6372aa053633629de4c18f899737d_3109e29a6a85f7827dbee.jpg",
                            "size": 750,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_z6832387799909_64a6372aa053633629de4c18f899737d_09e29a6a85f7827dbee3f.jpg",
                            "hash": "thumbnail_z6832387799909_64a6372aa053633629de4c18f899737d_9e29a6a85f7827dbee3fb",
                            "mime": "image/jpeg",
                            "name": "thumbnail_z6832387799909_64a6372aa053633629de4c18f899737d_09e29a6a85f7827dbee3f.jpg",
                            "size": 1547,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 2,
                    "fileId": 600158,
                    "variantIds": [
                        1369,
                        1371
                    ]
                },
                {
                    "id": 4120,
                    "createdOn": "2026-01-09T04:30:30.172Z",
                    "modifiedOn": "2026-01-09T04:30:30.172Z",
                    "url": "/uploads/chantrangwalnut_10f627808a7db2e509d0a.jpg",
                    "alt": null,
                    "filename": "chantrangwalnut_10f627808a7db2e509d0a.jpg",
                    "size": 65498,
                    "width": 1024,
                    "height": 1024,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_chantrangwalnut_a7db2e509d0a6480d5dbd.jpg",
                            "hash": "large_chantrangwalnut_7db2e509d0a6480d5dbda",
                            "mime": "image/jpeg",
                            "name": "large_chantrangwalnut_a7db2e509d0a6480d5dbd.jpg",
                            "size": 18955,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_chantrangwalnut_7808a7db2e509d0a6480d.jpg",
                            "hash": "small_chantrangwalnut_808a7db2e509d0a6480d5",
                            "mime": "image/jpeg",
                            "name": "small_chantrangwalnut_7808a7db2e509d0a6480d.jpg",
                            "size": 7082,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_chantrangwalnut_08a7db2e509d0a6480d5d.jpg",
                            "hash": "medium_chantrangwalnut_8a7db2e509d0a6480d5db",
                            "mime": "image/jpeg",
                            "name": "medium_chantrangwalnut_08a7db2e509d0a6480d5d.jpg",
                            "size": 12748,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_chantrangwalnut_db2e509d0a6480d5dbda1.jpg",
                            "hash": "xlarge_chantrangwalnut_b2e509d0a6480d5dbda18",
                            "mime": "image/jpeg",
                            "name": "xlarge_chantrangwalnut_db2e509d0a6480d5dbda1.jpg",
                            "size": 48146,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_chantrangwalnut_0f627808a7db2e509d0a6.jpg",
                            "hash": "xsmall_chantrangwalnut_f627808a7db2e509d0a64",
                            "mime": "image/jpeg",
                            "name": "xsmall_chantrangwalnut_0f627808a7db2e509d0a6.jpg",
                            "size": 787,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_chantrangwalnut_627808a7db2e509d0a648.jpg",
                            "hash": "thumbnail_chantrangwalnut_27808a7db2e509d0a6480",
                            "mime": "image/jpeg",
                            "name": "thumbnail_chantrangwalnut_627808a7db2e509d0a648.jpg",
                            "size": 1702,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 3,
                    "fileId": 600238,
                    "variantIds": [
                        912,
                        914,
                        910
                    ]
                },
                {
                    "id": 4121,
                    "createdOn": "2026-01-09T04:32:37.364Z",
                    "modifiedOn": "2026-01-09T04:32:37.364Z",
                    "url": "/uploads/chandenwalnut_2e509d0a6480d5dbda18f.jpg",
                    "alt": null,
                    "filename": "chandenwalnut_2e509d0a6480d5dbda18f.jpg",
                    "size": 68755,
                    "width": 1024,
                    "height": 1024,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_chandenwalnut_480d5dbda18fcfdaa33be.jpg",
                            "hash": "large_chandenwalnut_80d5dbda18fcfdaa33be7",
                            "mime": "image/jpeg",
                            "name": "large_chandenwalnut_480d5dbda18fcfdaa33be.jpg",
                            "size": 20551,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_chandenwalnut_d0a6480d5dbda18fcfdaa.jpg",
                            "hash": "small_chandenwalnut_0a6480d5dbda18fcfdaa3",
                            "mime": "image/jpeg",
                            "name": "small_chandenwalnut_d0a6480d5dbda18fcfdaa.jpg",
                            "size": 7895,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_chandenwalnut_a6480d5dbda18fcfdaa33.jpg",
                            "hash": "medium_chandenwalnut_6480d5dbda18fcfdaa33b",
                            "mime": "image/jpeg",
                            "name": "medium_chandenwalnut_a6480d5dbda18fcfdaa33.jpg",
                            "size": 13734,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_chandenwalnut_0d5dbda18fcfdaa33be7f.jpg",
                            "hash": "xlarge_chandenwalnut_d5dbda18fcfdaa33be7fe",
                            "mime": "image/jpeg",
                            "name": "xlarge_chandenwalnut_0d5dbda18fcfdaa33be7f.jpg",
                            "size": 50694,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_chandenwalnut_e509d0a6480d5dbda18fc.jpg",
                            "hash": "xsmall_chandenwalnut_509d0a6480d5dbda18fcf",
                            "mime": "image/jpeg",
                            "name": "xsmall_chandenwalnut_e509d0a6480d5dbda18fc.jpg",
                            "size": 915,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_chandenwalnut_09d0a6480d5dbda18fcfd.jpg",
                            "hash": "thumbnail_chandenwalnut_9d0a6480d5dbda18fcfda",
                            "mime": "image/jpeg",
                            "name": "thumbnail_chandenwalnut_09d0a6480d5dbda18fcfd.jpg",
                            "size": 1976,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 4,
                    "fileId": 600239,
                    "variantIds": [
                        906,
                        908,
                        904
                    ]
                },
                {
                    "id": 4119,
                    "createdOn": "2026-01-09T04:26:28.900Z",
                    "modifiedOn": "2026-01-09T04:26:28.900Z",
                    "url": "/uploads/chantrangmatden_d87a224591abe10f62780.jpg",
                    "alt": null,
                    "filename": "chantrangmatden_d87a224591abe10f62780.jpg",
                    "size": 56792,
                    "width": 1024,
                    "height": 1024,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_chantrangmatden_1abe10f627808a7db2e50.jpg",
                            "hash": "large_chantrangmatden_abe10f627808a7db2e509",
                            "mime": "image/jpeg",
                            "name": "large_chantrangmatden_1abe10f627808a7db2e50.jpg",
                            "size": 14873,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_chantrangmatden_24591abe10f627808a7db.jpg",
                            "hash": "small_chantrangmatden_4591abe10f627808a7db2",
                            "mime": "image/jpeg",
                            "name": "small_chantrangmatden_24591abe10f627808a7db.jpg",
                            "size": 5960,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_chantrangmatden_591abe10f627808a7db2e.jpg",
                            "hash": "medium_chantrangmatden_91abe10f627808a7db2e5",
                            "mime": "image/jpeg",
                            "name": "medium_chantrangmatden_591abe10f627808a7db2e.jpg",
                            "size": 10265,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_chantrangmatden_be10f627808a7db2e509d.jpg",
                            "hash": "xlarge_chantrangmatden_e10f627808a7db2e509d0",
                            "mime": "image/jpeg",
                            "name": "xlarge_chantrangmatden_be10f627808a7db2e509d.jpg",
                            "size": 37734,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_chantrangmatden_87a224591abe10f627808.jpg",
                            "hash": "xsmall_chantrangmatden_7a224591abe10f627808a",
                            "mime": "image/jpeg",
                            "name": "xsmall_chantrangmatden_87a224591abe10f627808.jpg",
                            "size": 743,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_chantrangmatden_a224591abe10f627808a7.jpg",
                            "hash": "thumbnail_chantrangmatden_224591abe10f627808a7d",
                            "mime": "image/jpeg",
                            "name": "thumbnail_chantrangmatden_a224591abe10f627808a7.jpg",
                            "size": 1542,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 2,
                    "fileId": 600237,
                    "variantIds": [
                        951,
                        952,
                        948
                    ]
                },
                {
                    "id": 801,
                    "createdOn": "2025-08-17T05:07:11.656Z",
                    "modifiedOn": "2025-08-17T05:07:11.656Z",
                    "url": "/uploads/z6832387698295_0452fba6547540718d99faab9f50b21c_f7827dbee3fbe6b7fd18d.jpg",
                    "alt": null,
                    "filename": "z6832387698295_0452fba6547540718d99faab9f50b21c_f7827dbee3fbe6b7fd18d.jpg",
                    "size": 22150,
                    "width": 800,
                    "height": 800,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_z6832387698295_0452fba6547540718d99faab9f50b21c_3fbe6b7fd18d50fa71fb6.jpg",
                            "hash": "large_z6832387698295_0452fba6547540718d99faab9f50b21c_fbe6b7fd18d50fa71fb6a",
                            "mime": "image/jpeg",
                            "name": "large_z6832387698295_0452fba6547540718d99faab9f50b21c_3fbe6b7fd18d50fa71fb6.jpg",
                            "size": 13958,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_z6832387698295_0452fba6547540718d99faab9f50b21c_dbee3fbe6b7fd18d50fa7.jpg",
                            "hash": "small_z6832387698295_0452fba6547540718d99faab9f50b21c_bee3fbe6b7fd18d50fa71",
                            "mime": "image/jpeg",
                            "name": "small_z6832387698295_0452fba6547540718d99faab9f50b21c_dbee3fbe6b7fd18d50fa7.jpg",
                            "size": 5209,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_z6832387698295_0452fba6547540718d99faab9f50b21c_ee3fbe6b7fd18d50fa71f.jpg",
                            "hash": "medium_z6832387698295_0452fba6547540718d99faab9f50b21c_e3fbe6b7fd18d50fa71fb",
                            "mime": "image/jpeg",
                            "name": "medium_z6832387698295_0452fba6547540718d99faab9f50b21c_ee3fbe6b7fd18d50fa71f.jpg",
                            "size": 9437,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_z6832387698295_0452fba6547540718d99faab9f50b21c_be6b7fd18d50fa71fb6a7.jpg",
                            "hash": "xlarge_z6832387698295_0452fba6547540718d99faab9f50b21c_e6b7fd18d50fa71fb6a75",
                            "mime": "image/jpeg",
                            "name": "xlarge_z6832387698295_0452fba6547540718d99faab9f50b21c_be6b7fd18d50fa71fb6a7.jpg",
                            "size": 34974,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_z6832387698295_0452fba6547540718d99faab9f50b21c_7827dbee3fbe6b7fd18d5.jpg",
                            "hash": "xsmall_z6832387698295_0452fba6547540718d99faab9f50b21c_827dbee3fbe6b7fd18d50",
                            "mime": "image/jpeg",
                            "name": "xsmall_z6832387698295_0452fba6547540718d99faab9f50b21c_7827dbee3fbe6b7fd18d5.jpg",
                            "size": 652,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_z6832387698295_0452fba6547540718d99faab9f50b21c_27dbee3fbe6b7fd18d50f.jpg",
                            "hash": "thumbnail_z6832387698295_0452fba6547540718d99faab9f50b21c_7dbee3fbe6b7fd18d50fa",
                            "mime": "image/jpeg",
                            "name": "thumbnail_z6832387698295_0452fba6547540718d99faab9f50b21c_27dbee3fbe6b7fd18d50f.jpg",
                            "size": 1269,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 3,
                    "fileId": 600159,
                    "variantIds": [
                        911,
                        909,
                        913
                    ]
                }
            ],
            "tags": [
                {
                    "id": 8,
                    "createdOn": "2026-01-09T04:38:43.595Z",
                    "modifiedOn": "2026-01-09T04:38:43.595Z",
                    "externalId": null,
                    "name": "combo"
                }
            ]
        },
        {
            "id": 40,
            "createdOn": "2025-07-31T07:07:05.773Z",
            "modifiedOn": "2025-07-31T08:02:59.074Z",
            "name": "Manson E3 Lite - Phiên Bản Lưới",
            "externalId": "55155575",
            "alias": "manson-e3-lite-phien-ban-luoi",
            "vendor": "",
            "description": "",
            "templateLayout": "variant",
            "images": [
                {
                    "id": 689,
                    "createdOn": "2025-07-31T07:07:05.722Z",
                    "modifiedOn": "2025-07-31T07:07:05.722Z",
                    "url": "/uploads/z6561705361867-4320f3352ec5bf7c19567e4eddfba5e1-1746180457281-ab614e7d-6dfa-4a13-8788-6c94b1f53a9c.jpg",
                    "alt": "image",
                    "filename": "z6561705361867-4320f3352ec5bf7c19567e4eddfba5e1-1746180457281-ab614e7d-6dfa-4a13-8788-6c94b1f53a9c.jpg",
                    "size": 305959,
                    "width": null,
                    "height": null,
                    "externalId": "104579982",
                    "formats": {},
                    "position": 4,
                    "fileId": 600126,
                    "variantIds": []
                },
                {
                    "id": 688,
                    "createdOn": "2025-07-31T07:07:05.704Z",
                    "modifiedOn": "2025-07-31T07:07:05.704Z",
                    "url": "/uploads/z6561705362373-73d15b70cb8e6e9950fd390af3a128cb-1746180436302-c8ae3493-7d71-4a94-a978-76b90f4f7fc9.jpg",
                    "alt": "image",
                    "filename": "z6561705362373-73d15b70cb8e6e9950fd390af3a128cb-1746180436302-c8ae3493-7d71-4a94-a978-76b90f4f7fc9.jpg",
                    "size": 301071,
                    "width": null,
                    "height": null,
                    "externalId": "104579983",
                    "formats": {},
                    "position": 3,
                    "fileId": 600125,
                    "variantIds": []
                },
                {
                    "id": 690,
                    "createdOn": "2025-07-31T08:03:18.515Z",
                    "modifiedOn": "2025-07-31T08:03:18.515Z",
                    "url": "/uploads/z6859271039191_50bf744922457b36bcc1a35897eb4558_f4423ed438ac3712f1dc3.jpg",
                    "alt": null,
                    "filename": "z6859271039191_50bf744922457b36bcc1a35897eb4558_f4423ed438ac3712f1dc3.jpg",
                    "size": 804861,
                    "width": 1920,
                    "height": 2560,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_z6859271039191_50bf744922457b36bcc1a35897eb4558_8ac3712f1dc37a255ab7d.jpg",
                            "hash": "large_z6859271039191_50bf744922457b36bcc1a35897eb4558_ac3712f1dc37a255ab7d5",
                            "mime": "image/jpeg",
                            "name": "large_z6859271039191_50bf744922457b36bcc1a35897eb4558_8ac3712f1dc37a255ab7d.jpg",
                            "size": 87197,
                            "width": 750,
                            "height": 1000
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_z6859271039191_50bf744922457b36bcc1a35897eb4558_ed438ac3712f1dc37a255.jpg",
                            "hash": "small_z6859271039191_50bf744922457b36bcc1a35897eb4558_d438ac3712f1dc37a255a",
                            "mime": "image/jpeg",
                            "name": "small_z6859271039191_50bf744922457b36bcc1a35897eb4558_ed438ac3712f1dc37a255.jpg",
                            "size": 21090,
                            "width": 375,
                            "height": 500
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_z6859271039191_50bf744922457b36bcc1a35897eb4558_438ac3712f1dc37a255ab.jpg",
                            "hash": "medium_z6859271039191_50bf744922457b36bcc1a35897eb4558_38ac3712f1dc37a255ab7",
                            "mime": "image/jpeg",
                            "name": "medium_z6859271039191_50bf744922457b36bcc1a35897eb4558_438ac3712f1dc37a255ab.jpg",
                            "size": 44905,
                            "width": 563,
                            "height": 751
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_z6859271039191_50bf744922457b36bcc1a35897eb4558_c3712f1dc37a255ab7d56.jpg",
                            "hash": "xlarge_z6859271039191_50bf744922457b36bcc1a35897eb4558_3712f1dc37a255ab7d564",
                            "mime": "image/jpeg",
                            "name": "xlarge_z6859271039191_50bf744922457b36bcc1a35897eb4558_c3712f1dc37a255ab7d56.jpg",
                            "size": 356625,
                            "width": 1440,
                            "height": 1920
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_z6859271039191_50bf744922457b36bcc1a35897eb4558_4423ed438ac3712f1dc37.jpg",
                            "hash": "xsmall_z6859271039191_50bf744922457b36bcc1a35897eb4558_423ed438ac3712f1dc37a",
                            "mime": "image/jpeg",
                            "name": "xsmall_z6859271039191_50bf744922457b36bcc1a35897eb4558_4423ed438ac3712f1dc37.jpg",
                            "size": 1196,
                            "width": 56,
                            "height": 75
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_z6859271039191_50bf744922457b36bcc1a35897eb4558_23ed438ac3712f1dc37a2.jpg",
                            "hash": "thumbnail_z6859271039191_50bf744922457b36bcc1a35897eb4558_3ed438ac3712f1dc37a25",
                            "mime": "image/jpeg",
                            "name": "thumbnail_z6859271039191_50bf744922457b36bcc1a35897eb4558_23ed438ac3712f1dc37a2.jpg",
                            "size": 3199,
                            "width": 117,
                            "height": 156
                        }
                    },
                    "position": 1,
                    "fileId": 600129,
                    "variantIds": [
                        925
                    ]
                },
                {
                    "id": 687,
                    "createdOn": "2025-07-31T07:07:05.409Z",
                    "modifiedOn": "2025-07-31T07:07:05.409Z",
                    "url": "/uploads/z6561705378442-a3b6982cb0026606301c6633f24f2fbb-1746180488458-43e4e688-afef-4e8e-9bd8-7136a24374c8.jpg",
                    "alt": "image",
                    "filename": "z6561705378442-a3b6982cb0026606301c6633f24f2fbb-1746180488458-43e4e688-afef-4e8e-9bd8-7136a24374c8.jpg",
                    "size": 354770,
                    "width": null,
                    "height": null,
                    "externalId": "104579981",
                    "formats": {},
                    "position": 2,
                    "fileId": 600124,
                    "variantIds": []
                },
                {
                    "id": 686,
                    "createdOn": "2025-07-31T07:07:04.885Z",
                    "modifiedOn": "2025-07-31T07:07:04.885Z",
                    "url": "/uploads/z6561705381242-f3334dca428387d894a89e342cd83050-1746180504672-848082d6-1269-4ab0-a6f9-ef71d1ef7650.jpg",
                    "alt": "image",
                    "filename": "z6561705381242-f3334dca428387d894a89e342cd83050-1746180504672-848082d6-1269-4ab0-a6f9-ef71d1ef7650.jpg",
                    "size": 262502,
                    "width": null,
                    "height": null,
                    "externalId": "104579980",
                    "formats": {},
                    "position": 1,
                    "fileId": 600123,
                    "variantIds": []
                },
                {
                    "id": 820,
                    "createdOn": "2025-09-09T09:23:44.814Z",
                    "modifiedOn": "2025-09-09T09:23:44.814Z",
                    "url": "/uploads/ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_ef0baef49fd17cb54546c.jpg",
                    "alt": null,
                    "filename": "ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_ef0baef49fd17cb54546c.jpg",
                    "size": 80472,
                    "width": 800,
                    "height": 800,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_c7742abf3e8ca11b1a650.jpg",
                            "hash": "large_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_abf3e8ca11b1a650458b8",
                            "mime": "image/jpeg",
                            "name": "large_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_c7742abf3e8ca11b1a650.jpg",
                            "size": 65262,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_fd17cb54546cc7742abf3.jpg",
                            "hash": "small_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_b54546cc7742abf3e8ca1",
                            "mime": "image/jpeg",
                            "name": "small_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_fd17cb54546cc7742abf3.jpg",
                            "size": 20698,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_54546cc7742abf3e8ca11.jpg",
                            "hash": "medium_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_cc7742abf3e8ca11b1a65",
                            "mime": "image/jpeg",
                            "name": "medium_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_54546cc7742abf3e8ca11.jpg",
                            "size": 40097,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_bf3e8ca11b1a650458b80.jpg",
                            "hash": "xlarge_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_e8ca11b1a650458b80b2a",
                            "mime": "image/jpeg",
                            "name": "xlarge_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_bf3e8ca11b1a650458b80.jpg",
                            "size": 170480,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_f0baef49fd17cb54546cc.jpg",
                            "hash": "xsmall_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_aef49fd17cb54546cc774",
                            "mime": "image/jpeg",
                            "name": "xsmall_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_f0baef49fd17cb54546cc.jpg",
                            "size": 1225,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_ef49fd17cb54546cc7742.jpg",
                            "hash": "thumbnail_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_9fd17cb54546cc7742abf",
                            "mime": "image/jpeg",
                            "name": "thumbnail_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi3_ef49fd17cb54546cc7742.jpg",
                            "size": 3381,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 3,
                    "fileId": 600169,
                    "variantIds": [
                        926
                    ]
                },
                {
                    "id": 818,
                    "createdOn": "2025-09-09T09:23:44.792Z",
                    "modifiedOn": "2025-09-09T09:23:44.792Z",
                    "url": "/uploads/ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_2fda90bdef0baef49fd17.jpg",
                    "alt": null,
                    "filename": "ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_2fda90bdef0baef49fd17.jpg",
                    "size": 79480,
                    "width": 800,
                    "height": 800,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_6cc7742abf3e8ca11b1a6.jpg",
                            "hash": "large_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_42abf3e8ca11b1a650458",
                            "mime": "image/jpeg",
                            "name": "large_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_6cc7742abf3e8ca11b1a6.jpg",
                            "size": 66313,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_49fd17cb54546cc7742ab.jpg",
                            "hash": "small_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_d17cb54546cc7742abf3e",
                            "mime": "image/jpeg",
                            "name": "small_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_49fd17cb54546cc7742ab.jpg",
                            "size": 21787,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_17cb54546cc7742abf3e8.jpg",
                            "hash": "medium_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_46cc7742abf3e8ca11b1a",
                            "mime": "image/jpeg",
                            "name": "medium_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_17cb54546cc7742abf3e8.jpg",
                            "size": 41714,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_2abf3e8ca11b1a650458b.jpg",
                            "hash": "xlarge_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_f3e8ca11b1a650458b80b",
                            "mime": "image/jpeg",
                            "name": "xlarge_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_2abf3e8ca11b1a650458b.jpg",
                            "size": 165970,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_fda90bdef0baef49fd17c.jpg",
                            "hash": "xsmall_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_bdef0baef49fd17cb5454",
                            "mime": "image/jpeg",
                            "name": "xsmall_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_fda90bdef0baef49fd17c.jpg",
                            "size": 1306,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_def0baef49fd17cb54546.jpg",
                            "hash": "thumbnail_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_f49fd17cb54546cc7742a",
                            "mime": "image/jpeg",
                            "name": "thumbnail_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi1_def0baef49fd17cb54546.jpg",
                            "size": 3699,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 1,
                    "fileId": 600167,
                    "variantIds": [
                        923
                    ]
                },
                {
                    "id": 819,
                    "createdOn": "2025-09-09T09:23:44.801Z",
                    "modifiedOn": "2025-09-09T09:23:44.801Z",
                    "url": "/uploads/ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_da90bdef0baef49fd17cb.jpg",
                    "alt": null,
                    "filename": "ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_da90bdef0baef49fd17cb.jpg",
                    "size": 79696,
                    "width": 800,
                    "height": 800,
                    "externalId": null,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_546cc7742abf3e8ca11b1.jpg",
                            "hash": "large_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_7742abf3e8ca11b1a6504",
                            "mime": "image/jpeg",
                            "name": "large_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_546cc7742abf3e8ca11b1.jpg",
                            "size": 64921,
                            "width": 750,
                            "height": 750
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_baef49fd17cb54546cc77.jpg",
                            "hash": "small_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_7cb54546cc7742abf3e8c",
                            "mime": "image/jpeg",
                            "name": "small_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_baef49fd17cb54546cc77.jpg",
                            "size": 20850,
                            "width": 375,
                            "height": 375
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_cb54546cc7742abf3e8ca.jpg",
                            "hash": "medium_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_4546cc7742abf3e8ca11b",
                            "mime": "image/jpeg",
                            "name": "medium_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_cb54546cc7742abf3e8ca.jpg",
                            "size": 40540,
                            "width": 563,
                            "height": 563
                        },
                        "xlarge": {
                            "ext": ".jpg",
                            "url": "/uploads/xlarge_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_742abf3e8ca11b1a65045.jpg",
                            "hash": "xlarge_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_3e8ca11b1a650458b80b2",
                            "mime": "image/jpeg",
                            "name": "xlarge_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_742abf3e8ca11b1a65045.jpg",
                            "size": 167741,
                            "width": 1440,
                            "height": 1440
                        },
                        "xsmall": {
                            "ext": ".jpg",
                            "url": "/uploads/xsmall_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_a90bdef0baef49fd17cb5.jpg",
                            "hash": "xsmall_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_90bdef0baef49fd17cb54",
                            "mime": "image/jpeg",
                            "name": "xsmall_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_a90bdef0baef49fd17cb5.jpg",
                            "size": 1222,
                            "width": 56,
                            "height": 56
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_0bdef0baef49fd17cb545.jpg",
                            "hash": "thumbnail_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_0baef49fd17cb54546cc7",
                            "mime": "image/jpeg",
                            "name": "thumbnail_ghe-van-phong-cong-thai-hoc-manson-e3-lite-phien-ban-luoi2_0bdef0baef49fd17cb545.jpg",
                            "size": 3581,
                            "width": 117,
                            "height": 117
                        }
                    },
                    "position": 2,
                    "fileId": 600168,
                    "variantIds": [
                        924
                    ]
                }
            ],
            "tags": []
        },
        {
            "id": 41,
            "createdOn": "2025-08-01T03:00:16.873Z",
            "modifiedOn": "2025-11-12T05:49:01.603Z",
            "name": "Tựa lưng công thái học Manson FlexBack",
            "externalId": "55193292",
            "alias": "tua-lung-cong-thai-hoc-manson-flexback",
            "vendor": "",
            "description": "",
            "templateLayout": "variant",
            "images": [
                {
                    "id": 692,
                    "createdOn": "2025-08-01T03:02:38.109Z",
                    "modifiedOn": "2025-08-01T03:02:38.109Z",
                    "url": "/uploads/vn-11134207-7ras8-m1w9rqkh8llfdf.webp",
                    "alt": "image",
                    "filename": "vn-11134207-7ras8-m1w9rqkh8llfdf.webp",
                    "size": 33554,
                    "width": null,
                    "height": null,
                    "externalId": "104701581",
                    "formats": {},
                    "position": 1,
                    "fileId": 600130,
                    "variantIds": [
                        930
                    ]
                }
            ],
            "tags": []
        },
        {
            "id": 42,
            "createdOn": "2025-09-17T09:19:22.230Z",
            "modifiedOn": "2025-09-17T09:19:22.230Z",
            "name": "T21",
            "externalId": null,
            "alias": null,
            "vendor": "",
            "description": null,
            "templateLayout": "variant",
            "images": [],
            "tags": []
        }
    ],
    "meta": {
        "itemsPerPage": 10,
        "totalItems": 49,
        "currentPage": 4,
        "totalPages": 5,
        "sortBy": [
            [
                "id",
                "ASC"
            ]
        ]
    },
    "links": {
        "first": "https://localhost:8001/api/products?page=1&limit=10&sortBy=id:ASC",
        "previous": "https://localhost:8001/api/products?page=3&limit=10&sortBy=id:ASC",
        "current": "https://localhost:8001/api/products?page=4&limit=10&sortBy=id:ASC",
        "next": "https://localhost:8001/api/products?page=5&limit=10&sortBy=id:ASC",
        "last": "https://localhost:8001/api/products?page=5&limit=10&sortBy=id:ASC"
    },
    "success": true,
    "message": "Get Product list successfully"
}

curl 'https://localhost:8001/api/products/32' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzgwMDM2NDQ5fQ.m7yAFW5HgBIzjf1dqTAlMkwDdyZvsjaHDnBuscne1bvHTi_G8XsuoQXME8N1CPkCUGml9-iRu6xdyWUszs2zIKIgktntVrszLy3e24GLLpDsKjwqaK_n6Pa-Y648PgMJWUuTnb-AOlyK3JW59m9sl9Yd9fCjaV3jFPs09wslFURMIplNGGgV_0EcxgWffhSTfqbAeUUF5msKc8U1YL5JqvEBGAEv8jt_hVZCfVuuvB7N_luxZHN5a8lZBJ2wYqkxY4ISsgTVuLOGxIr5kLZyTq1-noGKhBQ3LoWZ5lleM2dXAIxRs7KbrtKOPGVc0Tti03CIv5ub60Ajb-lgyaQKJRV1B1vpfcYp9AWC5lfn9TkMfbAt8-ajfwuIDBDuIRd1GSuJdOoERd_gefys0_pEv8ilxAnsNL4lcUQhWmNsx2gA3IQrGV7rJ4OGeGBJQL6P7qU2Ajqvff6Ui5bQs0FT3HSHXWRwwuW0373qkQy0Iy5Kp102amtUHQaJ2i9M5XxX01Z97Y9R5waH05ATps6E1w8fvLrbUv3OF01-dxA0RE4N74mYZwJzBQUZbPRVFPdKE-6kgMB_I23ZAsMSsVsUtcvJE7OOg3RmKm0xMXhwoitu94vGQvTQ3jTpN3LfrjyTi9KOVNGF0OKH783O3lzJdsP9ofM_bm2S7DO0xNTpfd0' \
  -H 'Referer: https://localhost:8000/' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'sec-ch-ua: "Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0'

{
    "success": true,
    "message": "Get Product successfully",
    "data": {
        "id": 32,
        "createdOn": "2025-07-04T10:09:46.732Z",
        "modifiedOn": "2025-07-04T10:09:46.732Z",
        "name": "Manson Iris",
        "externalId": "46090584",
        "alias": "manson-iris",
        "vendor": "Manson",
        "description": "",
        "templateLayout": null,
        "variants": [
            {
                "id": 109,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:10:31.415Z",
                "barcode": "Iris Matrex Đen",
                "sku": "IrisMD",
                "price": 4600000,
                "agentPrice1": 3900000,
                "agentPrice2": 3850000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": 23000,
                "weightUnit": "g",
                "unit": "ghế",
                "position": null,
                "displayName": "Matrex Đen",
                "values": [
                    {
                        "id": 108,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "Matrex Đen",
                        "externalId": null
                    }
                ],
                "imageId": 100
            },
            {
                "id": 110,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:10:25.649Z",
                "barcode": "Iris Matrex Xám",
                "sku": "IrisMX",
                "price": 4600000,
                "agentPrice1": 3900000,
                "agentPrice2": 3850000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": 23000,
                "weightUnit": "g",
                "unit": "ghế",
                "position": null,
                "displayName": "Matrex Xám",
                "values": [
                    {
                        "id": 109,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "Matrex Xám",
                        "externalId": null
                    }
                ],
                "imageId": 99
            },
            {
                "id": 111,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:13:51.931Z",
                "barcode": "Iris Wintex Đen",
                "sku": "IrisWD",
                "price": 4600000,
                "agentPrice1": 3900000,
                "agentPrice2": 3850000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": 23000,
                "weightUnit": "g",
                "unit": "ghế",
                "position": null,
                "displayName": "Wintex Đen",
                "values": [
                    {
                        "id": 110,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "Wintex Đen",
                        "externalId": null
                    }
                ],
                "imageId": 103
            },
            {
                "id": 112,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:13:45.301Z",
                "barcode": "Iris Wintex Xám",
                "sku": "IrisWX",
                "price": 4600000,
                "agentPrice1": 3900000,
                "agentPrice2": 3850000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": 23000,
                "weightUnit": "g",
                "unit": "ghế",
                "position": null,
                "displayName": "Wintex Xám",
                "values": [
                    {
                        "id": 111,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "Wintex Xám",
                        "externalId": null
                    }
                ],
                "imageId": 102
            },
            {
                "id": 113,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:14:09.759Z",
                "barcode": "Iris Wintex Full Xám",
                "sku": "IrisWintexLungXamLuoiXam",
                "price": 4950000,
                "agentPrice1": 4250000,
                "agentPrice2": 4200000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": 23000,
                "weightUnit": "g",
                "unit": "ghế",
                "position": null,
                "displayName": "Wintex Full Xám",
                "values": [
                    {
                        "id": 112,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "Wintex Full Xám",
                        "externalId": null
                    }
                ],
                "imageId": 101
            },
            {
                "id": 114,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:15:39.540Z",
                "barcode": "Iris CloudMesh Đen",
                "sku": "Iris-CL-D",
                "price": 4600000,
                "agentPrice1": 3900000,
                "agentPrice2": 3850000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": null,
                "weightUnit": "g",
                "unit": null,
                "position": null,
                "displayName": "CloudMesh Đen",
                "values": [
                    {
                        "id": 113,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Đen",
                        "externalId": null
                    }
                ],
                "imageId": 103
            },
            {
                "id": 115,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:15:51.766Z",
                "barcode": "Iris CloudMesh Xám",
                "sku": "Iris-CL-X",
                "price": 4600000,
                "agentPrice1": 3900000,
                "agentPrice2": 3850000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": null,
                "weightUnit": "g",
                "unit": null,
                "position": null,
                "displayName": "CloudMesh Xám",
                "values": [
                    {
                        "id": 114,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Xám",
                        "externalId": null
                    }
                ],
                "imageId": 102
            },
            {
                "id": 116,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:16:15.506Z",
                "barcode": "Iris CloudMesh Full Xám",
                "sku": "Iris-CL-FullXam",
                "price": 4950000,
                "agentPrice1": 4250000,
                "agentPrice2": 4200000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": null,
                "weightUnit": "g",
                "unit": null,
                "position": null,
                "displayName": "CloudMesh Full Xám",
                "values": [
                    {
                        "id": 115,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Full Xám",
                        "externalId": null
                    }
                ],
                "imageId": 101
            },
            {
                "id": 117,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:16:33.021Z",
                "barcode": "Iris CloudMesh Đen Gác Chân",
                "sku": "Iris-CL-D-GC",
                "price": 5100000,
                "agentPrice1": 4200000,
                "agentPrice2": 4150000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": null,
                "weightUnit": "g",
                "unit": null,
                "position": null,
                "displayName": "CloudMesh Đen Gác Chân",
                "values": [
                    {
                        "id": 116,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Đen Gác Chân",
                        "externalId": null
                    }
                ],
                "imageId": 103
            },
            {
                "id": 118,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:16:49.491Z",
                "barcode": "Iris CloudMesh Xám Gác Chân",
                "sku": "Iris-CL-X-GC",
                "price": 5100000,
                "agentPrice1": 4200000,
                "agentPrice2": 4150000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": null,
                "weightUnit": "g",
                "unit": null,
                "position": null,
                "displayName": "CloudMesh Xám Gác Chân",
                "values": [
                    {
                        "id": 117,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Xám Gác Chân",
                        "externalId": null
                    }
                ],
                "imageId": 102
            },
            {
                "id": 119,
                "createdOn": "2025-07-04T10:09:46.829Z",
                "modifiedOn": "2026-03-28T06:17:05.212Z",
                "barcode": "Iris CloudMesh Full Xám Gác Chân",
                "sku": "Iris-CL-FullXam-GC",
                "price": 5450000,
                "agentPrice1": 4550000,
                "agentPrice2": 4500000,
                "taxable": false,
                "requiresShipping": null,
                "active": true,
                "weight": null,
                "weightUnit": "g",
                "unit": null,
                "position": null,
                "displayName": "CloudMesh Full Xám Gác Chân",
                "values": [
                    {
                        "id": 118,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Full Xám Gác Chân",
                        "externalId": null
                    }
                ],
                "imageId": 101
            }
        ],
        "options": [
            {
                "id": 40,
                "createdOn": "2025-07-04T10:09:46.732Z",
                "modifiedOn": "2025-07-04T10:09:46.732Z",
                "title": "Loại Ghế",
                "externalId": null,
                "values": [
                    {
                        "id": 108,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "Matrex Đen",
                        "externalId": null
                    },
                    {
                        "id": 109,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "Matrex Xám",
                        "externalId": null
                    },
                    {
                        "id": 110,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "Wintex Đen",
                        "externalId": null
                    },
                    {
                        "id": 111,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "Wintex Xám",
                        "externalId": null
                    },
                    {
                        "id": 112,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "Wintex Full Xám",
                        "externalId": null
                    },
                    {
                        "id": 113,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Đen",
                        "externalId": null
                    },
                    {
                        "id": 114,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Xám",
                        "externalId": null
                    },
                    {
                        "id": 115,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Full Xám",
                        "externalId": null
                    },
                    {
                        "id": 116,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Đen Gác Chân",
                        "externalId": null
                    },
                    {
                        "id": 117,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Xám Gác Chân",
                        "externalId": null
                    },
                    {
                        "id": 118,
                        "createdOn": "2025-07-04T10:09:46.732Z",
                        "modifiedOn": "2025-07-04T10:09:46.732Z",
                        "value": "CloudMesh Full Xám Gác Chân",
                        "externalId": null
                    }
                ]
            }
        ],
        "tags": [],
        "collections": [],
        "images": [
            {
                "id": 100,
                "createdOn": "2025-07-04T10:09:46.558Z",
                "modifiedOn": "2025-07-04T10:09:46.558Z",
                "url": "/uploads/medium-ghe-cong-thai-hoc-manson-iris-matrex-den-404844eb7b.webp",
                "alt": "image",
                "filename": "medium-ghe-cong-thai-hoc-manson-iris-matrex-den-404844eb7b.webp",
                "size": 37456,
                "width": null,
                "height": null,
                "externalId": "97578215",
                "formats": {},
                "position": 2,
                "fileId": 600098,
                "variants": [
                    {
                        "id": 109,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:10:31.415Z",
                        "barcode": "Iris Matrex Đen",
                        "sku": "IrisMD",
                        "price": 4600000,
                        "agentPrice1": 3900000,
                        "agentPrice2": 3850000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": 23000,
                        "weightUnit": "g",
                        "unit": "ghế",
                        "position": null,
                        "displayName": "Matrex Đen",
                        "values": [
                            {
                                "id": 108,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "Matrex Đen",
                                "externalId": null
                            }
                        ],
                        "imageId": 100
                    }
                ],
                "variantIds": [
                    109
                ]
            },
            {
                "id": 99,
                "createdOn": "2025-07-04T10:09:46.654Z",
                "modifiedOn": "2025-07-04T10:09:46.654Z",
                "url": "/uploads/medium-ghe-cong-thai-hoc-manson-iris-matrex-xam-2e2a8c7c48.webp",
                "alt": "image",
                "filename": "medium-ghe-cong-thai-hoc-manson-iris-matrex-xam-2e2a8c7c48.webp",
                "size": 53244,
                "width": null,
                "height": null,
                "externalId": "97578238",
                "formats": {},
                "position": 1,
                "fileId": 600099,
                "variants": [
                    {
                        "id": 110,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:10:25.649Z",
                        "barcode": "Iris Matrex Xám",
                        "sku": "IrisMX",
                        "price": 4600000,
                        "agentPrice1": 3900000,
                        "agentPrice2": 3850000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": 23000,
                        "weightUnit": "g",
                        "unit": "ghế",
                        "position": null,
                        "displayName": "Matrex Xám",
                        "values": [
                            {
                                "id": 109,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "Matrex Xám",
                                "externalId": null
                            }
                        ],
                        "imageId": 99
                    }
                ],
                "variantIds": [
                    110
                ]
            },
            {
                "id": 102,
                "createdOn": "2025-07-04T10:09:46.688Z",
                "modifiedOn": "2025-07-04T10:09:46.688Z",
                "url": "/uploads/medium-ghe-cong-thai-hoc-manson-iris-wintex-xam-f5d24125da.webp",
                "alt": "image",
                "filename": "medium-ghe-cong-thai-hoc-manson-iris-wintex-xam-f5d24125da.webp",
                "size": 27944,
                "width": null,
                "height": null,
                "externalId": "97578334",
                "formats": {},
                "position": 4,
                "fileId": 600101,
                "variants": [
                    {
                        "id": 118,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:16:49.491Z",
                        "barcode": "Iris CloudMesh Xám Gác Chân",
                        "sku": "Iris-CL-X-GC",
                        "price": 5100000,
                        "agentPrice1": 4200000,
                        "agentPrice2": 4150000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": null,
                        "weightUnit": "g",
                        "unit": null,
                        "position": null,
                        "displayName": "CloudMesh Xám Gác Chân",
                        "values": [
                            {
                                "id": 117,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "CloudMesh Xám Gác Chân",
                                "externalId": null
                            }
                        ],
                        "imageId": 102
                    },
                    {
                        "id": 112,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:13:45.301Z",
                        "barcode": "Iris Wintex Xám",
                        "sku": "IrisWX",
                        "price": 4600000,
                        "agentPrice1": 3900000,
                        "agentPrice2": 3850000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": 23000,
                        "weightUnit": "g",
                        "unit": "ghế",
                        "position": null,
                        "displayName": "Wintex Xám",
                        "values": [
                            {
                                "id": 111,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "Wintex Xám",
                                "externalId": null
                            }
                        ],
                        "imageId": 102
                    },
                    {
                        "id": 115,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:15:51.766Z",
                        "barcode": "Iris CloudMesh Xám",
                        "sku": "Iris-CL-X",
                        "price": 4600000,
                        "agentPrice1": 3900000,
                        "agentPrice2": 3850000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": null,
                        "weightUnit": "g",
                        "unit": null,
                        "position": null,
                        "displayName": "CloudMesh Xám",
                        "values": [
                            {
                                "id": 114,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "CloudMesh Xám",
                                "externalId": null
                            }
                        ],
                        "imageId": 102
                    }
                ],
                "variantIds": [
                    118,
                    112,
                    115
                ]
            },
            {
                "id": 103,
                "createdOn": "2025-07-04T10:09:46.715Z",
                "modifiedOn": "2025-07-04T10:09:46.715Z",
                "url": "/uploads/medium-ghe-cong-thai-hoc-manson-iris-wintex-den-e0011b3435.webp",
                "alt": "image",
                "filename": "medium-ghe-cong-thai-hoc-manson-iris-wintex-den-e0011b3435.webp",
                "size": 34400,
                "width": null,
                "height": null,
                "externalId": "97578289",
                "formats": {},
                "position": 5,
                "fileId": 600102,
                "variants": [
                    {
                        "id": 111,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:13:51.931Z",
                        "barcode": "Iris Wintex Đen",
                        "sku": "IrisWD",
                        "price": 4600000,
                        "agentPrice1": 3900000,
                        "agentPrice2": 3850000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": 23000,
                        "weightUnit": "g",
                        "unit": "ghế",
                        "position": null,
                        "displayName": "Wintex Đen",
                        "values": [
                            {
                                "id": 110,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "Wintex Đen",
                                "externalId": null
                            }
                        ],
                        "imageId": 103
                    },
                    {
                        "id": 114,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:15:39.540Z",
                        "barcode": "Iris CloudMesh Đen",
                        "sku": "Iris-CL-D",
                        "price": 4600000,
                        "agentPrice1": 3900000,
                        "agentPrice2": 3850000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": null,
                        "weightUnit": "g",
                        "unit": null,
                        "position": null,
                        "displayName": "CloudMesh Đen",
                        "values": [
                            {
                                "id": 113,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "CloudMesh Đen",
                                "externalId": null
                            }
                        ],
                        "imageId": 103
                    },
                    {
                        "id": 117,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:16:33.021Z",
                        "barcode": "Iris CloudMesh Đen Gác Chân",
                        "sku": "Iris-CL-D-GC",
                        "price": 5100000,
                        "agentPrice1": 4200000,
                        "agentPrice2": 4150000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": null,
                        "weightUnit": "g",
                        "unit": null,
                        "position": null,
                        "displayName": "CloudMesh Đen Gác Chân",
                        "values": [
                            {
                                "id": 116,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "CloudMesh Đen Gác Chân",
                                "externalId": null
                            }
                        ],
                        "imageId": 103
                    }
                ],
                "variantIds": [
                    111,
                    114,
                    117
                ]
            },
            {
                "id": 101,
                "createdOn": "2025-07-04T10:09:46.660Z",
                "modifiedOn": "2025-07-04T10:09:46.660Z",
                "url": "/uploads/medium-ghe-van-phong-cong-thai-hoc-manson-iris-lung-xam-luoi-xam-1022632ef5-068fe8ab81.webp",
                "alt": "image",
                "filename": "medium-ghe-van-phong-cong-thai-hoc-manson-iris-lung-xam-luoi-xam-1022632ef5-068fe8ab81.webp",
                "size": 36804,
                "width": null,
                "height": null,
                "externalId": "97578344",
                "formats": {},
                "position": 3,
                "fileId": 600100,
                "variants": [
                    {
                        "id": 116,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:16:15.506Z",
                        "barcode": "Iris CloudMesh Full Xám",
                        "sku": "Iris-CL-FullXam",
                        "price": 4950000,
                        "agentPrice1": 4250000,
                        "agentPrice2": 4200000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": null,
                        "weightUnit": "g",
                        "unit": null,
                        "position": null,
                        "displayName": "CloudMesh Full Xám",
                        "values": [
                            {
                                "id": 115,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "CloudMesh Full Xám",
                                "externalId": null
                            }
                        ],
                        "imageId": 101
                    },
                    {
                        "id": 113,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:14:09.759Z",
                        "barcode": "Iris Wintex Full Xám",
                        "sku": "IrisWintexLungXamLuoiXam",
                        "price": 4950000,
                        "agentPrice1": 4250000,
                        "agentPrice2": 4200000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": 23000,
                        "weightUnit": "g",
                        "unit": "ghế",
                        "position": null,
                        "displayName": "Wintex Full Xám",
                        "values": [
                            {
                                "id": 112,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "Wintex Full Xám",
                                "externalId": null
                            }
                        ],
                        "imageId": 101
                    },
                    {
                        "id": 119,
                        "createdOn": "2025-07-04T10:09:46.829Z",
                        "modifiedOn": "2026-03-28T06:17:05.212Z",
                        "barcode": "Iris CloudMesh Full Xám Gác Chân",
                        "sku": "Iris-CL-FullXam-GC",
                        "price": 5450000,
                        "agentPrice1": 4550000,
                        "agentPrice2": 4500000,
                        "taxable": false,
                        "requiresShipping": null,
                        "active": true,
                        "weight": null,
                        "weightUnit": "g",
                        "unit": null,
                        "position": null,
                        "displayName": "CloudMesh Full Xám Gác Chân",
                        "values": [
                            {
                                "id": 118,
                                "createdOn": "2025-07-04T10:09:46.732Z",
                                "modifiedOn": "2025-07-04T10:09:46.732Z",
                                "value": "CloudMesh Full Xám Gác Chân",
                                "externalId": null
                            }
                        ],
                        "imageId": 101
                    }
                ],
                "variantIds": [
                    116,
                    113,
                    119
                ]
            }
        ]
    }
}

Hãy lấy:
1/ Giá đang bán: price
2/ Giá đại lý 1: agentPrice1
3/ Giá đại lý 2: agentPrice1


Sau đó dựa theo file pdf: /Users/nguyenkhanh/Documents/GitHub/bao-gia-dai-ly/Báo giá The Manson 27 - 05 - 2026 _V2.pdf
Làm các yêu cầu sau:
1/ Tạo ra 1 trang đăng nhập, với mật khẩu được cài đặt theo link drive:
/Users/nguyenkhanh/Documents/GitHub/bao-gia-dai-ly/.env

GOOGLE_SHEET_ID_agentPrice1=12hb6ji66KZZMbxqvlgy8nGEM7-W6v9I_T643RHB4D5A
GOOGLE_SHEET_ID_agentPrice2=1tuLJW8iitLeptGJl1mWGnZlWTRIljXa9SaO5ONPnf8w

tại sheet đầu tiên, có header: STT, tên, Tên Group Đại Lý, pass
Sử dụng: /Users/nguyenkhanh/Documents/GitHub/bao-gia-dai-ly/client_secret.json client_secret.json

const { google } = require('googleapis');
const credentials = require('./client_secret.json');
const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

để lấy dữ liệu
Nếu người dùng nhập pass trùng với GOOGLE_SHEET_ID_agentPrice1 vào thì tương ứng với agentPrice1 hoặc GOOGLE_SHEET_ID_agentPrice2 tương đương giá của agentPrice2

2/ Sau khi đăng nhập, hãy lưu tài khoản đó vào localstorage hoặc kỹ thuật nào đó để sau này khỏi phải đăng nhập lại. Thời hạn sau 1 tháng sẽ yêu cầu
đăng nhập lại 1 lần. Cẩn thận bị móc API, hãy bảo mật API

3/ Khi đại lý đăng nhập vào, hãy báo về telegram
tên bot: dailyms_bot
Use this token to access the HTTP API: 8631226635:AAFN7W-kU8eikkh_k8tnXopY0LD5ssigZyY

Nội dung tin nhắn:
{Tên Group Đại Lý} đã truy cập vào lúc: hh:mm

4/ sau khi đăng nhập, hãy cho đại lý, hãy thiết kế giao diện của trang chủ tương tự như: /Users/nguyenkhanh/Documents/GitHub/bao-gia-dai-ly/Báo giá The Manson 27 - 05 - 2026 _V2.pdf

Với dữ liệu đơn hàng được lấy động, từ localhost:8001/api/products bao gồm hình ảnh, giá bán lẻ, Mô tả và hiển thị giá agentPrice1 hoặc agentPrice2 tương ứng với hình ảnh