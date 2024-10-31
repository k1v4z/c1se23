const prisma = require("../../prisma/db");

module.exports = class ActivityLocationRepository {
  async getActivityLocationByName(name, address) {
    const acLocation = await prisma.activity_locations.findUnique({
      where: {
        name_address: {
          name,
          address,
        },
      },
    });

    return acLocation;
  }

  async getActivityLocationsByProvince(provinceName) {
    const locations = await prisma.activity_locations.findMany({
      where: {
        OR: [
          {
            address: {
              endsWith: provinceName,
            },
          },
          {
            // Add another condition here if needed
            // For example, matching another field
            address: provinceName
          },
        ],
      },
      include: {
        locationOnTypes: true,
      },
    });

    return locations;
  }

  async createActivityLocation(data) {
    const newLocation = await prisma.activity_locations.create({
      data: {
        name: data.name,
        address: data.address,
        open_at: data.open_at,
        close_at: data.close_at,
        longitude: data.longitude,
        latitude: data.latitude,
        imageUrl: data.imageUrl,
        locationOnTypes: {
          create: {
            type: {
              connect: {
                name: data.locationType,
              },
            },
          },
        },
      },
      include: {
        locationOnTypes: true,
      },
    });

    return newLocation;
  }

  async editActivityLocation(id, data) {
    const updateData = {
      name: data.name,
      address: data.address,
      open_at: data.open_at,
      close_at: data.close_at,
      longitude: data.longitude,
      latitude: data.latitude,
      imageUrl: data.imageUrl,
    };
    if (data.locationType) {
      const oldLocationType = await prisma.types.findUnique({
        select: {
          id: true,
        },
        where: {
          name: data.oldLocationType,
        },
      });

      updateData.locationOnTypes = {
        update: {
          where: {
            activity_location_id_type_id: {
              activity_location_id: id, // ID của activity location
              type_id: oldLocationType.id, // ID của loại địa điểm
            },
          },
          data: {
            type: {
              connect: {
                name: data.locationType, // Kết nối với type mới dựa trên tên
              },
            },
          },
        },
      };
    }

    const editLocation = await prisma.activity_locations.update({
      where: {
        id: id,
      },
      data: updateData,
      include: {
        locationOnTypes: true,
      },
    });

    return editLocation;
  }

  async getActivityLocation(page, limit, province, type) {
    const whereClause = {};
    if (province) {
      whereClause.address = {
        endsWith: province,
      };
    }

    if (type) {
      whereClause.locationOnTypes = {
        some: {
          type: {
            name: type,
          },
        },
      };
    }

    const totalLocations = await prisma.activity_locations.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(totalLocations / limit);

    const locations = await prisma.activity_locations.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      where: whereClause,
    });

    return {
      locations: locations,
      totalPages: totalPages,
    };
  }

  async getLocationById(locationId) {
    const location = await prisma.activity_locations.findFirst({
      where: {
        id: locationId,
      },
    });

    return location;
  }

  async deleteActivityLocation(locationId) {
    const deletedLocationOnType = prisma.locationOnTypes.deleteMany({
      where: {
        activity_location_id: locationId,
      },
    });

    const deletedLocations = prisma.activity_locations.delete({
      where: {
        id: locationId,
      },
    });

    await prisma.$transaction([deletedLocationOnType, deletedLocations]);
  }
};
