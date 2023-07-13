export const mockItemRequestArray = [
    {
        name: "Item 1",
        numberOfItems: 2,
        closureTime: 48,
        status: "New",
        requestCreateTime: "2022-04-20T12:00:00Z",
        liveBiddingTime: "2022-04-21T12:00:00Z",
        description: "This is item 1",
        maxPrice: 100,
        id: "1",
        biddingStatus: "In Progress",
        isLive: false,
    },
    {
        name: "Item 2",
        numberOfItems: 1,
        closureTime: 48,
        status: "Pre Owned",
        notOlderThan: 4,
        requestCreateTime: "2022-04-19T12:00:00Z",
        liveBiddingTime: "2022-04-22T12:00:00Z",
        description: "This is item 2",
        maxPrice: 100,
        id: "2",
        biddingStatus: "In Progress",
        isLive: true,
    },
];

export const response = {
    data: {
        data: mockItemRequestArray,
    },
};
