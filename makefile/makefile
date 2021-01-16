CC = gcc

BUILD_DIR = $(PWD)

ifeq ($(DPLATFORM_PAL),YES)
BIN_TARGET = plane_pal
CPPFLAGS = -g -DPLATFORM_PAL
else
BIN_TARGET = plane
CPPFLAGS = -g
endif

OBJS_PATH = $(BUILD_DIR)/obj
BIN_PATH = $(BUILD_DIR)/bin
#BIN_TARGET = plane

INC_PATH = -I$(BUILD_DIR)/../inc

BBU_ISP_SRC = $(BUILD_DIR)/../src

vpath %.c $(BBU_ISP_SRC)
vpath %.o $(OBJS_PATH)
vpath %.d $(OBJS_PATH)

SRCS = $(notdir $(wildcard $(BBU_ISP_SRC)/*.c))
OBJS = $(patsubst %.c, %.o, $(SRCS))

.PHONY : $(BIN_TARGET) clean

$(BIN_TARGET) : prepare_dirs plane_app
	@echo "$(NEWLINE)Building $(BIN_TARGET) successfully. Target path: $(BIN_PATH)/$(BIN_TARGET)"

-include $(wildcard $(patsubst %, $(OBJS_PATH)/%.d, $(basename $(SRCS))))

%.o : %.c
	@$(CC) $(CPPFLAGS) $(INC_PATH) $< -MM -MT $(@:.d=.o) > $(OBJS_PATH)/$*.d
	$(CC) $(CPPFLAGS) $(INC_PATH) -c $< -o $(OBJS_PATH)/$@

prepare_dirs:
	$(Q)@echo -e "Preparing directories for build..."
	$(Q)mkdir -p $(OBJS_PATH)
	$(Q)mkdir -p $(BIN_PATH)

LIBS = -lrt -lpthread

TARGET_OBJS = $(OBJS_PATH)/*.o
plane_app : $(OBJS)
	$(CC) $(TARGET_OBJS) -o $(BIN_PATH)/$(BIN_TARGET) $(LIBS)

clean :
ifneq ("$(BUILD_DIR)", "")
	$(Q)rm -rf $(OBJS_PATH)
	$(Q)rm -rf $(BIN_PATH)
endif
